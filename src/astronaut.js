import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const astronautInfo = { status: 'loading', clips: [], authoredBones: 0, error: '' };
let template;
export const astronautReady = new GLTFLoader().loadAsync(`${import.meta.env?.BASE_URL ?? '/'}models/astronaut/Enceladus.glb`)
  .then(gltf => {
    template = gltf.scene;
    astronautInfo.clips = gltf.animations.map(clip => clip.name);
    template.traverse(mesh => { if (mesh.isMesh) mesh.castShadow = mesh.receiveShadow = true; });
    astronautInfo.status = 'ready';
  }).catch(error => {
    astronautInfo.status = 'error'; astronautInfo.error = error.message;
    console.warn('Kosmonavt yuklanmadi; asosiy qahramon uchishda davom etadi.', error);
  });

export function createAstronaut() {
  const g = new T.Group(), pivot = new T.Group(); g.add(pivot);
  let model, mixer, flightAction, phase = 0, disposed = false;
  const bounds = new T.Box3(), worldPosition = new T.Vector3();
  const ready = astronautReady.then(() => {
    if (!template || disposed) return;
    model = template.clone(true); pivot.add(model);
    const tracks = [], times = Array.from({ length: 61 }, (_, i) => i * 1.8 / 60);
    const joints = { AstroArmLeft: [-.22, .12], AstroArmRight: [-.22, -.12],
      AstroLegLeft: [-.12, .06], AstroLegRight: [-.12, -.06], AstroHead: [-.04, .02],
      AstroLegLeftLower: [.45,.08], AstroLegRightLower: [.45,-.08],
      AstroArmLeftLower: [-.38,.1], AstroArmRightLower: [-.38,-.1] };
    for (const [name, [base, sway]] of Object.entries(joints)) {
      const joint = model.getObjectByName(name); if (!joint) continue;
      tracks.push(new T.NumberKeyframeTrack(`${joint.uuid}.rotation[x]`, times,
        times.map(t => base + Math.sin(t / 1.8 * Math.PI * 2) * sway)));
      if (name.startsWith('AstroArm')) tracks.push(new T.NumberKeyframeTrack(`${joint.uuid}.rotation[z]`, times,
        times.map(t => (name.endsWith('Left') ? -.1 : .1) + Math.cos(t / 1.8 * Math.PI * 2) * .025)));
    }
    mixer = new T.AnimationMixer(model);
    flightAction = mixer.clipAction(new T.AnimationClip('Enceladus_generated_flight', 1.8, tracks)).play();
    update(0, {});
  });
  function update(dt, { laneDelta = 0, thrust = 1 } = {}) {
    if (!model) return;
    phase += dt; mixer.update(dt);
    pivot.rotation.x = T.MathUtils.damp(pivot.rotation.x, -.12 + Math.sin(phase * 2.7) * .025, 10, dt || 1);
    pivot.rotation.z = T.MathUtils.damp(pivot.rotation.z, T.MathUtils.clamp(-laneDelta * .11, -.2, .2)
      + Math.sin(phase * 2.1) * .02, 10, dt || 1);
    model.updateWorldMatrix(true,true); bounds.setFromObject(model);
    const anchor = g.getWorldPosition(worldPosition).y;
    pivot.position.y += anchor + .05 + Math.sin(phase * 3.6) * .025 - bounds.min.y;
  }
  return { g, pivot, ready, get model() { return model; }, update, dispose() {
    disposed = true; mixer?.stopAllAction(); if (model) mixer?.uncacheRoot(model); g.removeFromParent();
  } };
}
