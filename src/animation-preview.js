import {characters} from './storage.js';
import * as T from 'three';
import { createPlayer, avatarInfo, astronautInfo } from './player.js';
if (!import.meta.env.DEV) throw new Error('Bu sahifa faqat mahalliy sinov uchun.');
const scene = new T.Scene(); scene.background = new T.Color(0x90bac8);
scene.add(new T.HemisphereLight(0xe9fbff,0x665e64,2.5));
const sun = new T.DirectionalLight(0xffefd9,2.5); sun.position.set(-4,8,5);sun.castShadow=true;
scene.add(sun);
const floor = new T.Mesh(new T.PlaneGeometry(100,100), new T.MeshStandardMaterial({color:0x536a76}));
floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
scene.add(new T.GridHelper(100,100,0x93b7b8,0x627d87));
const camera=new T.PerspectiveCamera(44,innerWidth/innerHeight,.1,150);
const renderer=new T.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;document.body.append(renderer.domElement);
let characterId=new URLSearchParams(location.search).get('character')||'aziz';
const create=()=>createPlayer(error=>document.getElementById('info').textContent=error,characters.find(c=>c.id===characterId)||characters[0]);
let avatar=create();scene.add(avatar.g);document.getElementById('character').value=characterId;
document.getElementById('character').onchange=e=>{avatar.dispose();characterId=e.target.value;avatar=create();scene.add(avatar.g);mode='run';time=0;};
let mode='run',time=0,paused=false,front=false,last=performance.now(),total=0,stepOnce=false;
document.getElementById('controls').onclick=e=>{if(e.target.dataset.mode){
  if(e.target.dataset.mode==='extend'){if(mode==='fly')avatar.flight.collect(8,avatar.g.position.y);return;}
  mode=e.target.dataset.mode;time=0;avatar.reset();if(mode==='fly')avatar.flight.collect(8,avatar.g.position.y);
}};
document.getElementById('pause').onclick=e=>{paused=!paused;e.target.textContent=paused?'Davom etish':'To‘xtatish'};
document.getElementById('step').onclick=()=>{paused=true;stepOnce=true;document.getElementById('pause').textContent='Davom etish'};
document.getElementById('angle').onclick=()=>front=!front;
function frame(now){requestAnimationFrame(frame);let dt=Math.min(.04,(now-last)/1000);last=now;if(stepOnce)dt=.1;
 if((!paused||stepOnce)&&avatarInfo.status==='ready'&&astronautInfo.status!=='loading'){stepOnce=false;
  time+=dt;total+=dt;let y=0,vy=0,grounded=true,active=mode,progress=0;
  if(mode==='jump'){
   const cycle=time%1.8;
   if(cycle<.11)active='takeoff';
   else if(cycle<.89){const t=cycle-.11;y=Math.max(0,10.5*t-13.5*t*t);vy=10.5-27*t;grounded=y<.001;active=y>0?'jump':'run'}
   else active='run';
  }
  if(mode==='board')active='run';
  if(mode==='roll'){progress=(time%1.6)/.8;active=progress<1?'roll':'run'}
  if(mode==='fly') {avatar.flight.update(dt);y=avatar.flight.height;grounded=!avatar.flight.active||avatar.flight.state==='landing';active=grounded?'run':'fly';}
  avatar.g.position.y=y;
  avatar.board.visible=mode==='board';avatar.update(dt,{mode:active,speed:24,grounded,velocityY:vy,rollProgress:progress,boardActive:mode==='board'});
  const d=avatar.diagnostics;
  document.getElementById('info').textContent=`Holat: ${mode==='fly'?avatar.flight.state:d.mode}\nJetpack: ${avatar.flight.remaining.toFixed(1)} s\nKosmonavt: ${astronautInfo.status}\nKlip: ${d.action}\nModeldan olingan kliplar: ${d.authored.length}\nBo‘y / to‘qnashuv: ${avatar.collider.currentHeight.toFixed(2)}\nMasshtab: ${d.scale.toFixed(3)} (o‘zgarmaydi)`;
 }
 camera.position.set(front?-4:4,3+avatar.g.position.y,front?-6:6);
 camera.lookAt(-.5,1+avatar.g.position.y,0);renderer.render(scene,camera);
}
requestAnimationFrame(frame);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
