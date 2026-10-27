import * as T from 'three';
import { createAvatar, avatarInfo } from './avatar.js';
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
const avatar=createAvatar(error=>document.getElementById('info').textContent=error);scene.add(avatar.g);
let mode='run',time=0,paused=false,front=false,last=performance.now(),total=0;
document.getElementById('controls').onclick=e=>{if(e.target.dataset.mode){mode=e.target.dataset.mode;time=0}};
document.getElementById('pause').onclick=e=>{paused=!paused;e.target.textContent=paused?'Davom etish':'To‘xtatish'};
document.getElementById('angle').onclick=()=>front=!front;
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.04,(now-last)/1000);last=now;
 if(!paused&&avatarInfo.status==='ready'){
  time+=dt;total+=dt;let y=0,vy=0,grounded=true,active=mode,progress=0;
  if(mode==='jump'){
   const cycle=time%1.8;
   if(cycle<.11)active='takeoff';
   else if(cycle<.89){const t=cycle-.11;y=Math.max(0,10.5*t-13.5*t*t);vy=10.5-27*t;grounded=y<.001;active=y>0?'jump':'run'}
   else active='run';
  }
  if(mode==='roll'){progress=(time%1.6)/.8;active=progress<1?'roll':'run'}
  if(mode==='fly') {y=2;grounded=false}
  avatar.g.position.y=y;
  avatar.update(dt,{mode:active,speed:24,grounded,velocityY:vy,rollProgress:progress});
  const d=avatar.diagnostics;
  document.getElementById('info').textContent=`Holat: ${d.mode}\nKlip: ${d.action}\nModeldan olingan kliplar: ${d.authored.length}\nBo‘y / to‘qnashuv: ${avatar.collider.currentHeight.toFixed(2)}\nMasshtab: ${d.scale.toFixed(3)} (o‘zgarmaydi)`;
 }
 camera.position.set(front?-4:4,3+avatar.g.position.y*.5,front?-6:6);
 camera.lookAt(-.5,1+avatar.g.position.y*.65,0);renderer.render(scene,camera);
}
requestAnimationFrame(frame);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
