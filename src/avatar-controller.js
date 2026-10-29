import * as T from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { box } from './world.js';
import { buildAvatarAnimations } from './avatar-animation.js';
import { getCharacterAsset } from './character-assets.js';
import { createPoseBounds } from './pose-bounds.js';

export const avatarInfo = { status: 'loading', clips: [], generated: [], error: '' };
let legacyReady;
function legacyAsset(){return legacyReady??=new FBXLoader().loadAsync(`${import.meta.env?.BASE_URL ?? '/'}models/avatar/model.fbx`).then(model => {
  model.traverse(mesh => {
    if (!mesh.isMesh) return;
    mesh.castShadow = mesh.receiveShadow = true;
    for (const m of [mesh.material].flat()) {
      if (m.map) m.map.colorSpace = T.SRGBColorSpace;
      m.shininess = Math.min(m.shininess ?? 20, 35);
    }
  });
  return {scene:model,animations:model.animations,facing:Math.PI,id:'legacy'};
}).catch(error => {
  avatarInfo.status = 'error'; avatarInfo.error = error.message;
  console.error('Avatar FBX yuklanmadi:', error);
});}

export function createAvatar(onError, colors) {
  const g = new T.Group(), body = new T.Group(), pivot = new T.Group();
  g.add(body); body.add(pivot);
  const board = box(g, 0, .09, 0, 1.05, .12, 1.3, 0x63fff0); board.visible = false;
  const collider = { height: 2.3, currentHeight: 2.3, halfWidth: .34, halfDepth: .27, offsetX:0,offsetZ: 0, rollHeight: 2.3 };
  const bounds = new T.Box3(), actions = {}, generated = {};
  const diagnostics = { mode: 'idle', action: '', authored: [], generated: [], scale: 1 };
  let disposed = false, root, mixer, currentAction, lastMode = 'idle', landTime = 0,poseBounds;
  let flightTime = 0, jumpTime = 0, groundedBefore = true;
  avatarInfo.status='loading';
  const assetReady=colors?.id?getCharacterAsset(colors.id).catch(error=>{console.warn('Tanlangan model yuklanmadi, zaxira qahramon ishlatiladi.',error);return legacyAsset()}):legacyAsset();
  const instanceReady = assetReady.then(asset => {
    if (disposed) return;
    if (!asset) return onError(avatarInfo.error);
    const template=asset.scene;
    root = clone(template);
    if (asset.id==='legacy'&&colors && colors.id !== 'aziz') root.traverse(mesh => {
      if (mesh.isMesh && mesh.name === 'outfit_top') {
        mesh.material = mesh.material.clone(); mesh.material.color.setHex(colors.color);
        mesh.userData.avatarOwnMaterial = true;
      }
    });
    root.rotation.y = asset.facing;
    sync(); bounds.setFromObject(root, true);
    root.scale.multiplyScalar(collider.height / (bounds.max.y - bounds.min.y));
    sync(); bounds.setFromObject(root, true);
    root.position.x -= (bounds.min.x + bounds.max.x) / 2;
    root.position.z -= (bounds.min.z + bounds.max.z) / 2;
    root.position.y -= bounds.min.y;
    pivot.add(root); sync();
    const clips = buildAvatarAnimations(root);
    mixer = new T.AnimationMixer(root);
    const patterns = { idle: /idle/i, run: /run|jog/i, board:/board|surf/i, takeoff: /takeoff/i, jump: /jump/i, roll: /roll|slide/i,
      fly: /fly|flight|hover/i, land: /land/i };
    for (const [mode, clip] of Object.entries(clips)) {
      generated[mode] = mixer.clipAction(clip);
      const authored = asset.animations.find(clip => patterns[mode].test(clip.name));
      actions[mode] = authored ? mixer.clipAction(authored) : generated[mode];
      if (['jump', 'roll', 'land', 'takeoff'].includes(mode)) {
        actions[mode].setLoop(T.LoopOnce, 1); actions[mode].clampWhenFinished = true;
      }
    }
    diagnostics.characterId=asset.id;avatarInfo.clips=asset.animations.map(c=>c.name);
    diagnostics.authored = avatarInfo.clips;
    diagnostics.generated = Object.keys(clips).filter(mode => actions[mode] === generated[mode]);
    avatarInfo.generated = diagnostics.generated; diagnostics.scale = root.scale.x;
    if(asset.id!=='legacy')poseBounds=createPoseBounds(root);
    update(0, { mode: 'idle' });
    avatarInfo.status='ready';
  });
  function sync() {
    root.updateWorldMatrix(true, true);
    // Update SkinnedMesh inverse bind matrices as well as the bone transforms.
    root.updateMatrixWorld(true);
  }
  function select(mode, fade) {
    const next = actions[mode];
    if (next === currentAction) return;
    next.reset().setEffectiveWeight(1).play();
    if (currentAction) next.crossFadeFrom(currentAction, fade, false);
    currentAction = next; diagnostics.action = next.getClip().name;
  }
  function update(dt, { mode = 'idle', speed = 18, laneDelta = 0, boardActive = false,
    rollProgress = 0, velocityY = 0, grounded = mode === 'run' || mode === 'idle' } = {}) {
    if (!root || !mixer) return;
    if (mode !== lastMode && mode === 'jump') jumpTime = 0;
    if (grounded && !groundedBefore && mode !== 'roll') landTime = .24;
    if (mode === 'roll' || mode === 'fly') landTime = 0;
    const animationMode = landTime > 0 && mode === 'run' ? 'land' : boardActive&&mode==='run'?'board':mode;
    select(animationMode, mode === 'roll' || lastMode === 'roll' ? .07 : .14);
    currentAction.timeScale = animationMode === 'run' ? T.MathUtils.clamp(speed / 18, .8, 1.7) : 1;
    if (mode === 'roll') {
      currentAction.paused = true;
      currentAction.time = T.MathUtils.clamp(rollProgress, 0, .999) * currentAction.getClip().duration;
    } else if (mode === 'jump') {
      jumpTime += dt;
      currentAction.paused = true;
      let progress = velocityY > 0 ? Math.min(.53, jumpTime * 1.15)
        : Math.min(.98, .55 + Math.min(1, -velocityY / 16) * .43);
      progress = T.MathUtils.clamp(progress + Math.sin(jumpTime * 12) * .012, 0, .99);
      currentAction.time = progress * currentAction.getClip().duration;
    } else currentAction.paused = false;
    mixer.update(dt); flightTime += dt;
    const pitch = mode === 'fly' ? -.13 + Math.sin(flightTime * 3) * .025 : mode === 'jump' ? -.05 : 0;
    pivot.rotation.x = T.MathUtils.damp(pivot.rotation.x, pitch, 12, dt || 1);
    pivot.rotation.z = T.MathUtils.damp(pivot.rotation.z, T.MathUtils.clamp(laneDelta * -.09, -.18, .18)
      + (mode === 'fly' ? Math.sin(flightTime * 2.6) * .035 : 0), 12, dt || 1);
    // Never change mesh or skeleton scale for an animation state.
    sync(); if(poseBounds)poseBounds(bounds);else bounds.setFromObject(root, true);
    const floor = boardActive ? .16 : .05;
    body.position.y += floor - (bounds.min.y - g.position.y);
    if (mode === 'fly') body.position.y += Math.sin(flightTime * 4) * .035;
    collider.currentHeight = bounds.max.y - bounds.min.y + floor + (mode === 'fly' ? .04 : 0);
    collider.rollHeight = collider.currentHeight;
    collider.halfDepth = Math.max(.24, (bounds.max.z - bounds.min.z) * .5);
    if(poseBounds)collider.halfWidth=T.MathUtils.clamp((bounds.max.x-bounds.min.x)*.4,.3,.58);
    collider.offsetX=(bounds.min.x+bounds.max.x)*.5-g.position.x;
    collider.offsetZ = (bounds.min.z + bounds.max.z) * .5 - g.position.z;
    diagnostics.mode = animationMode;
    groundedBefore = grounded; lastMode = mode; landTime = Math.max(0, landTime - dt);
  }
  return { g, body, board, collider, update, diagnostics, ready: instanceReady, dispose() {
    disposed = true; mixer?.stopAllAction();
    if (root) {
      mixer?.uncacheRoot(root);
      const skeletons=new Set();
      root.traverse(mesh => {
        if (mesh.userData.avatarOwnMaterial) mesh.material.dispose();
        if(mesh.isSkinnedMesh)skeletons.add(mesh.skeleton);
      });
      skeletons.forEach(skeleton=>skeleton.dispose());
    }
    g.removeFromParent();
  } };
}
