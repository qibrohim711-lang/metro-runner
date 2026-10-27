import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { Box3, DefaultLoadingManager, Texture } from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

// Node inspects the real FBX rig/geometry; embedded image decoding is checked in-browser.
globalThis.window = { URL };
DefaultLoadingManager.addHandler(/.*/, {
  load: () => new Texture(), setPath() { return this; }
});
const bytes = fs.readFileSync(new URL('../public/models/avatar/model.fbx', import.meta.url));
const source = new FBXLoader().parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
FBXLoader.prototype.loadAsync = async () => source;
const { createAvatar, avatarInfo } = await import('../src/avatar.js');

test('supplied rig has embedded materials, no authored clips, and grounded poses', async () => {
  assert.equal(source.animations.length, 0);
  let textured = 0;
  source.traverse(mesh => { if (mesh.isMesh && mesh.material.map) textured++; });
  assert.ok(textured >= 8);
  const avatar = createAvatar(error => assert.fail(error));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(avatarInfo.status, 'ready');
  for (const mode of ['idle', 'run', 'jump', 'roll', 'fly', 'run']) {
    for (let frame = 0; frame < 24; frame++) {
      const y = mode === 'jump' ? 2 : mode === 'fly' ? 7 : 0;
      avatar.g.position.set(-3, y, 0);
      avatar.update(1 / 30, { mode, speed: 36, laneDelta: .2, rollProgress: frame / 24 });
      avatar.g.updateMatrixWorld(true);
      const bounds = new Box3().setFromObject(avatar.body, true);
      assert.ok(Number.isFinite(bounds.min.y));
      assert.ok(Math.abs(bounds.min.y - y - .05) < (mode === 'fly' ? .04 : .002), `${mode}: feet at ${bounds.min.y}, base ${y}`);
      if (mode === 'roll' && frame >= 5 && frame <= 17) assert.ok(bounds.max.y - bounds.min.y < 1.45);
    }
  }
  assert.ok(avatar.collider.halfWidth >= .3 && avatar.collider.halfWidth <= .48);
  avatar.dispose();
});

test('restart clones use independent bones and preserve the cached template', async () => {
  const a = createAvatar(assert.fail), b = createAvatar(assert.fail);
  await new Promise(resolve => setImmediate(resolve));
  a.update(.1, { mode: 'run', speed: 30 });
  b.update(.1, { mode: 'idle' });
  const bonesA = [], bonesB = [];
  a.body.traverse(node => { if (node.isBone) bonesA.push(node); });
  b.body.traverse(node => { if (node.isBone) bonesB.push(node); });
  assert.ok(bonesA.length > 30);
  assert.notEqual(bonesA[0], bonesB[0]);
  assert.ok(bonesA.some((bone, i) => !bone.quaternion.equals(bonesB[i].quaternion)));
  a.dispose(); b.dispose();
});

test('slide bends bones without shrinking and restores running collision height', async () => {
  const avatar = createAvatar(assert.fail);
  await new Promise(resolve => setImmediate(resolve));
  const scales = new Map();
  avatar.body.traverse(node => scales.set(node.uuid, node.scale.clone()));
  for (let frame = 0; frame < 48; frame++) {
    avatar.update(1 / 60, { mode: 'roll', rollProgress: frame / 48 });
    avatar.body.traverse(node => assert.ok(node.scale.equals(scales.get(node.uuid)), `${node.name} scaled`));
    if (frame >= 12 && frame < 32) assert.ok(avatar.collider.currentHeight < 1.5);
  }
  for (let frame = 0; frame < 20; frame++) avatar.update(1 / 60, { mode: 'run', grounded: true });
  assert.ok(avatar.collider.currentHeight > 2);
  assert.equal(avatar.diagnostics.mode, 'run');
  assert.equal(avatar.diagnostics.action, 'Metro_run');
  assert.deepEqual(avatar.diagnostics.authored, []);
  avatar.dispose();
});

test('jump and flight keep moving bones and landing uses a recovery clip', async () => {
  const avatar = createAvatar(assert.fail);
  await new Promise(resolve => setImmediate(resolve));
  for (const mode of ['jump', 'fly']) {
    let before;
    avatar.update(.04, { mode, velocityY: 8, grounded: false });
    const bones = [];
    avatar.body.traverse(node => { if (node.isBone) bones.push(node); });
    before = bones.map(node => node.quaternion.clone());
    for (let frame = 0; frame < 12; frame++) avatar.update(1 / 60, { mode, velocityY: 5, grounded: false });
    assert.ok(bones.filter((node, i) => node.quaternion.angleTo(before[i]) > .02).length >= 4, `${mode} frozen`);
  }
  avatar.update(1 / 60, { mode: 'run', grounded: true });
  assert.equal(avatar.diagnostics.action, 'Metro_land');
  for (let frame = 0; frame < 20; frame++) avatar.update(1 / 60, { mode: 'run', grounded: true });
  assert.equal(avatar.diagnostics.action, 'Metro_run');
  avatar.dispose();
});

test('flight animation is consistent at 30 and 60 FPS', async () => {
  const avatars = [createAvatar(assert.fail), createAvatar(assert.fail)];
  await new Promise(resolve => setImmediate(resolve));
  const rotations = [];
  for (let i = 0; i < 2; i++) {
    const fps = i ? 60 : 30;
    for (let frame = 0; frame < fps; frame++) avatars[i].update(1 / fps, { mode: 'fly', grounded: false });
    const bones = [];
    avatars[i].body.traverse(node => { if (node.isBone) bones.push(node.quaternion.clone()); });
    rotations.push(bones);
  }
  rotations[0].forEach((q, i) => assert.ok(q.angleTo(rotations[1][i]) < .002));
  avatars.forEach(avatar => avatar.dispose());
});
