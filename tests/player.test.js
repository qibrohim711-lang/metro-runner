import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { DefaultLoadingManager, Texture } from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

globalThis.window={URL};
DefaultLoadingManager.addHandler(/.*/,{load:()=>new Texture(),setPath(){return this}});
const readBuffer=path=>{const b=fs.readFileSync(path);return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)};
const base=new FBXLoader().parse(readBuffer('public/models/avatar/model.fbx'),'');
const astro=await new GLTFLoader().parseAsync(readBuffer('public/models/astronaut/Enceladus.glb'),'');
FBXLoader.prototype.loadAsync=async()=>base;
GLTFLoader.prototype.loadAsync=async()=>astro;
const {createPlayer,astronautInfo}=await import('../src/player.js');

test('actual astronaut has generated joints; model swapping reuses all effect objects',async()=>{
  const player=createPlayer(assert.fail);await player.ready;
  assert.equal(player.g.name,'playerRoot');assert.equal(astronautInfo.status,'ready');
  assert.deepEqual(astronautInfo.clips,[]);
  const model=player.g.getObjectByName('Enceladus');assert.ok(model);
  let astroGroup=model;while(astroGroup.parent!==player.g)astroGroup=astroGroup.parent;
  for(const joint of ['AstroArmLeftLower','AstroLegRightLower'])assert.ok(model.getObjectByName(joint));
  const snapshot=()=>{let nodes=0,points=0;player.g.traverse(o=>{nodes++;if(o.isPoints)points+=o.geometry.attributes.position.count});return{nodes,points}};
  const initial=snapshot(), rootScale=player.g.scale.clone();
  for(let cycle=0;cycle<2;cycle++){
    player.flight.collect();
    for(let frame=0;frame<95;frame++){
      player.flight.update(.1);player.g.position.set(cycle?3:-3,player.flight.height,0);
      player.update(.1,{mode:'run',grounded:!player.flight.active,speed:25,laneDelta:.3});
      if(player.flight.state==='flying'){assert.equal(player.body.visible,false);assert.equal(astroGroup.visible,true);}
      assert.ok(player.g.scale.equals(rootScale));
    }
    assert.equal(player.flight.state,'running');assert.equal(player.body.visible,true);assert.equal(astroGroup.visible,false);
    assert.deepEqual(snapshot(),initial);
  }
  player.flight.collect();player.flight.update(.3);player.update(.3,{mode:'fly'});
  player.reset();assert.equal(player.body.visible,true);assert.equal(astroGroup.visible,false);
  assert.equal(player.flight.remaining,0);player.dispose();
});

test('dissolve materials are private and disposed without disposing shared textures',async()=>{
  const a=createPlayer(assert.fail),b=createPlayer(assert.fail);await Promise.all([a.ready,b.ready]);
  const meshes=[];a.body.traverse(o=>{if(o.isMesh)meshes.push(o)});
  const materials=new Set(meshes.flatMap(m=>[m.material].flat()));
  let disposed=0;materials.forEach(m=>m.addEventListener('dispose',()=>disposed++));
  a.dispose();assert.equal(disposed,materials.size);
  b.flight.collect();b.flight.update(1);assert.doesNotThrow(()=>b.update(.1,{mode:'fly'}));b.dispose();
});
