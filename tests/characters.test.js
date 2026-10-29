import fs from 'node:fs';import assert from 'node:assert/strict';import test from 'node:test';
import * as T from 'three';import{GLTFLoader}from'three/addons/loaders/GLTFLoader.js';
import{characters,chooseCharacter,load,save}from'../src/storage.js';
const fixtures={};for(const id of ['aziz','lola','sardor']){const b=fs.readFileSync(`public/models/characters/${id}.glb`);fixtures[id]=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'')}
const b=fs.readFileSync('public/models/astronaut/Enceladus.glb');const astronaut=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');
GLTFLoader.prototype.loadAsync=async url=>fixtures[url.split('/').at(-1).replace('.glb','')]||astronaut;
T.TextureLoader.prototype.loadAsync=async()=>new T.Texture();
const{createPlayer}=await import('../src/player.js');

test('old IDs, prices, unlocks, coins and selection survive storage round-trip',()=>{
 assert.deepEqual(characters.map(c=>[c.id,c.price]),[['aziz',0],['lola',150],['sardor',300]]);
 let saved=JSON.stringify({coins:355,best:4821,characters:['aziz','lola','sardor'],selected:'lola',boards:2,sound:false});
 globalThis.localStorage={getItem:()=>saved,setItem:(key,value)=>{assert.equal(key,'metro-runner');saved=value}};
 const existing=load();assert.equal(existing.coins,355);assert.equal(existing.selected,'lola');
 assert.ok(chooseCharacter(existing,'sardor'));assert.equal(existing.coins,355);save(existing);
 const again=load();assert.deepEqual(again.characters,['aziz','lola','sardor']);assert.equal(again.selected,'sardor');assert.equal(again.best,4821);
 const fresh={coins:149,characters:['aziz'],selected:'aziz'};assert.equal(chooseCharacter(fresh,'lola'),false);assert.equal(fresh.coins,149);
 fresh.coins=450;assert.ok(chooseCharacter(fresh,'lola'));assert.equal(fresh.coins,300);assert.ok(chooseCharacter(fresh,'sardor'));assert.equal(fresh.coins,0);
});

for(const character of characters)test(`${character.name}: real skinning, motion, board, astronaut and return`,async()=>{
 const player=createPlayer(assert.fail,character);await player.ready;
 assert.equal(player.diagnostics.characterId,character.id);assert.deepEqual(player.diagnostics.authored,[]);
 let skinned=0;player.body.traverse(mesh=>{if(mesh.isSkinnedMesh){skinned++;const index=mesh.geometry.attributes.skinIndex;for(const value of index.array)assert.ok(value<mesh.skeleton.bones.length)}});assert.ok(skinned);
 const scales=new Map();player.body.traverse(node=>scales.set(node.uuid,node.scale.clone()));
 for(const mode of ['run','jump','roll','run']){
  let minimum=Infinity;
  for(let frame=0;frame<10;frame++){
   player.update(.08,{mode,speed:24,velocityY:mode==='jump'?8-frame*2:0,grounded:mode==='run',rollProgress:frame/10,laneDelta:.3});
   minimum=Math.min(minimum,player.collider.currentHeight);
   player.body.traverse(node=>assert.ok(node.scale.equals(scales.get(node.uuid))));
   assert.ok(Number.isFinite(player.collider.currentHeight));
   if(frame===5){player.g.updateMatrixWorld(true);const exact=new T.Box3().setFromObject(player.body,true);
     assert.ok(exact.min.y>0&&exact.min.y<.09,`${character.id} feet misplaced: ${exact.min.y}`);}
  }
  if(mode==='roll')assert.ok(minimum<1.5,`${character.id} slide too tall: ${minimum}`);
 }
 player.update(.1,{mode:'run',boardActive:true,grounded:true});for(let i=0;i<4;i++)player.update(.1,{mode:'run',boardActive:true,grounded:true});assert.equal(player.diagnostics.action,'Metro_board');
 const identity=player.body;
 player.flight.collect();for(let i=0;i<95;i++){player.flight.update(.1);player.g.position.y=player.flight.height;player.update(.1,{mode:'run',grounded:!player.flight.active})}
 assert.equal(player.flight.state,'running');assert.equal(player.body,identity);assert.equal(player.diagnostics.characterId,character.id);assert.equal(player.body.visible,true);
 player.reset();player.dispose();
});
