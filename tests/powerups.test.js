import test from 'node:test';import assert from 'node:assert/strict';
import{createPowerup,updatePowerup,powerupMeta}from'../src/powerups.js';
for(const type of Object.keys(powerupMeta))test(`${type}: detailed pooled visual moves independently of pickup position`,()=>{
 const item=createPowerup(type);item.position.set(3,1.5,-20);const anchor=item.position.clone();let count=0;item.traverse(()=>count++);
 assert.ok(count>=10);assert.ok(item.userData.powerupVisual.children.length>=4);
 for(let i=0;i<120;i++)updatePowerup(item,1/60,i/60);
 assert.ok(item.position.equals(anchor));assert.notEqual(item.userData.powerupVisual.rotation.y,0);
 let after=0;item.traverse(()=>after++);assert.equal(after,count);
});
