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
      assert.ok(Math.abs(bounds.min.y - y - .05) < .002, `${mode}: feet at ${bounds.min.y}, base ${y}`);
      if (mode === 'roll' && frame > 8) assert.ok(bounds.max.y - bounds.min.y < .9);
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
