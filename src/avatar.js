import * as T from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { box } from './world.js';

export const avatarInfo = { status: 'loading', clips: [], error: '' };
let template;
const ready = new FBXLoader().loadAsync(`${import.meta.env?.BASE_URL ?? '/'}models/avatar/model.fbx`)
  .then(model => {
    template = model;
    avatarInfo.clips = model.animations.map(clip => clip.name);
    model.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      for (const material of [object.material].flat()) {
        // FBX phong materials carry their original embedded diffuse/normal maps.
        if (material.map) material.map.colorSpace = T.SRGBColorSpace;
        material.shininess = Math.min(material.shininess ?? 20, 35);
      }
    });
    avatarInfo.status = 'ready';
  }).catch(error => {
    avatarInfo.status = 'error';
    avatarInfo.error = error.message;
    console.error('Avatar FBX yuklanmadi:', error);
  });

export function createAvatar(onError, colors) {
  const g = new T.Group(), body = new T.Group();
  g.add(body);
  const board = box(g, 0, .09, 0, 1.05, .12, 1.3, 0x63fff0);
  board.visible = false;
  const collider = { height: 2.3, halfWidth: .34, halfDepth: .27, rollHeight: .8 };
  let disposed = false, root, shoes, pose = [], phase = 0, rollBlend = 0;
  const pivot = new T.Group();
  body.add(pivot);
  let mixer, currentAction;
  const actions = {};
  const bounds = new T.Box3();
  const quaternion = new T.Quaternion();
  const axisX = new T.Vector3(1, 0, 0), axisZ = new T.Vector3(0, 0, 1);

  ready.then(() => {
    if (disposed) return;
    if (!template) { onError(avatarInfo.error); return; }
    root = clone(template);
    shoes = root.getObjectByName('outfit_shoes');
    if (colors && colors.id !== 'aziz') {
      root.traverse(mesh => {
        if (mesh.isMesh && mesh.name === 'outfit_top') {
          mesh.material = mesh.material.clone();
          mesh.material.color.setHex(colors.color);
          mesh.userData.avatarOwnMaterial = true;
        }
      });
    }
    // Supplied avatar faces +Z; the track runs toward -Z.
    root.rotation.y = Math.PI;
    root.updateWorldMatrix(true, true);
    root.updateMatrixWorld(true);
    bounds.setFromObject(root);
    const scale = collider.height / (bounds.max.y - bounds.min.y);
    root.scale.multiplyScalar(scale);
    root.updateWorldMatrix(true, true);
    root.updateMatrixWorld(true);
    bounds.setFromObject(root);
    root.position.x -= (bounds.min.x + bounds.max.x) / 2;
    root.position.z -= (bounds.min.z + bounds.max.z) / 2;
    root.position.y -= bounds.min.y;
    pivot.add(root);
    root.traverse(bone => {
      if (!bone.isBone) return;
      if (/^(Left|Right)(Arm|ForeArm|UpLeg|Leg)$/.test(bone.name) && bone.position.lengthSq() > 1e-8) {
        const parentInverse = bone.parent.getWorldQuaternion(new T.Quaternion()).invert();
        const rootRotation = root.getWorldQuaternion(new T.Quaternion());
        const localAxis = axis => axis.clone().applyQuaternion(rootRotation).applyQuaternion(parentInverse).normalize();
        pose.push({ bone, rest: bone.quaternion.clone(), current: bone.quaternion.clone(), side: bone.name.startsWith('Left') ? 1 : -1,
          swingAxis: localAxis(axisX), tuckAxis: localAxis(axisZ) });
      }
    });
    if (template.animations.length) {
      mixer = new T.AnimationMixer(root);
      for (const clip of template.animations) actions[clip.name] = mixer.clipAction(clip);
    }
    update(0, { mode: 'idle', speed: 18 });
    // Measure the posed torso, rather than the original T-pose's extended arms.
    root.updateWorldMatrix(true, true);
    root.updateMatrixWorld(true);
    bounds.setFromObject(root, true);
    collider.halfWidth = T.MathUtils.clamp((bounds.max.x - bounds.min.x) * .34, .3, .48);
    collider.halfDepth = T.MathUtils.clamp((bounds.max.z - bounds.min.z) * .4, .22, .38);
  });

  function update(dt, { mode = 'idle', speed = 18, laneDelta = 0, boardActive = false, rollProgress = 0 } = {}) {
    if (!root) return;
    phase += dt * T.MathUtils.clamp(speed * .7, 12, 21);
    const airborne = mode === 'jump' || mode === 'fly';
    const running = mode === 'run';
    const rollTarget = mode === 'roll' ? 1 : 0;
    rollBlend = T.MathUtils.damp(rollBlend, rollTarget, 24, dt || 1);
    const clipName = Object.keys(actions).find(name => new RegExp(
      mode === 'run' ? 'run|jog' : mode === 'roll' ? 'roll|slide' : airborne ? 'jump|fall' : 'idle', 'i'
    ).test(name));
    if (clipName) {
      const action = actions[clipName];
      if (action !== currentAction) {
        currentAction?.fadeOut(.18);
        action.reset().fadeIn(.18).play();
        currentAction = action;
      }
      actionSpeed(currentAction, speed, running);
      mixer.update(dt);
    } else {
      currentAction?.fadeOut(.15);
      currentAction = null;
      for (const { bone, rest, current, side, swingAxis, tuckAxis } of pose) {
        bone.quaternion.copy(rest);
        let angle = 0;
        if (bone.name.endsWith('Arm') && !bone.name.endsWith('ForeArm')) {
          bone.quaternion.premultiply(quaternion.setFromAxisAngle(tuckAxis, -side * 1.32));
          angle = running ? -Math.sin(phase) * .65 * side : airborne ? -.65 : -.08;
        } else if (bone.name.endsWith('ForeArm')) angle = running ? -.75 : -.35;
        else if (bone.name.endsWith('UpLeg')) angle = running ? Math.sin(phase) * .65 * side : airborne ? -.35 * side : 0;
        else if (bone.name.endsWith('Leg')) angle = running ? Math.max(0, -Math.sin(phase) * side) * .95 : airborne ? .65 : 0;
        bone.quaternion.premultiply(quaternion.setFromAxisAngle(swingAxis, angle));
        current.slerp(bone.quaternion, dt ? 1 - Math.exp(-dt * 20) : 1);
        bone.quaternion.copy(current);
      }
    }
    // A compact forward tuck fits the same crouching collision volume as the game.
    pivot.scale.set(1, T.MathUtils.lerp(1, .32, rollBlend), T.MathUtils.lerp(1, .65, rollBlend));
    pivot.rotation.x = mode === 'roll' ? -Math.PI * 2 * rollProgress : 0;
    body.rotation.z = T.MathUtils.damp(body.rotation.z, T.MathUtils.clamp(laneDelta * -.12, -.22, .22), 12, dt || 1);
    root.updateWorldMatrix(true, true);
    root.updateMatrixWorld(true);
    bounds.setFromObject(mode === 'roll' || rollBlend > .01 ? root : shoes ?? root, true);
    // Only shoes need skinning for ordinary grounding; a roll can put other parts lowest.
    body.position.y += (boardActive ? .16 : .05) - (bounds.min.y - g.position.y);
  }
  return { g, body, board, collider, update, dispose() {
    disposed = true;
    mixer?.stopAllAction();
    if (root) {
      mixer?.uncacheRoot(root);
      root.traverse(mesh => { if (mesh.userData.avatarOwnMaterial) mesh.material.dispose(); });
    }
    // Geometry and embedded textures are shared with the cached template.
    g.removeFromParent();
  } };
}

function actionSpeed(action, speed, running) {
  action.timeScale = running ? T.MathUtils.clamp(speed / 18, .8, 1.7) : 1;
}
