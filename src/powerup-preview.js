import * as T from 'three';import{createPowerup,updatePowerup}from'./powerups.js';
if(!import.meta.env.DEV)throw new Error('Faqat mahalliy sinov.');
const scene=new T.Scene();scene.background=new T.Color(0x17324b);scene.add(new T.HemisphereLight(0xecfbff,0x496171,2.5));const light=new T.DirectionalLight(0xffeed8,3);light.position.set(-3,5,7);scene.add(light);
const items=['jet','magnet','double','sneakers'].map((type,i)=>{const item=createPowerup(type);item.position.x=(i-1.5)*1.7;scene.add(item);return item});
const camera=new T.PerspectiveCamera(38,innerWidth/innerHeight,.1,30);camera.position.set(0,2,7);camera.lookAt(0,0,0);
const renderer=new T.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));document.body.append(renderer.domElement);
let last=performance.now(),time=0;function frame(now){requestAnimationFrame(frame);const dt=Math.min(.04,(now-last)/1000);last=now;time+=dt;items.forEach(item=>updatePowerup(item,dt,time));renderer.render(scene,camera)}requestAnimationFrame(frame);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
