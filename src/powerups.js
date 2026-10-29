import * as T from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import fontData from './assets/digit-font.json' with {type:'json'};
const font=new FontLoader().parse(fontData),materials=new Map();
const material=(color,metalness=.2)=>{const key=`${color}:${metalness}`;if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color,metalness,roughness:.35}));return materials.get(key)};
function mesh(parent,geometry,color,x=0,y=0,z=0){const m=new T.Mesh(geometry,material(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m}
function block(parent,w,h,d,color,x=0,y=0,z=0){return mesh(parent,new T.BoxGeometry(w,h,d),color,x,y,z)}
function extrude(parent,shape,depth,color){const m=mesh(parent,new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:16}),color);m.position.z=-depth/2;return m}
const icons={
 jet:'<path d="M12 2C7 6 7 12 9 16h6c2-4 2-10-3-14Z"/><path d="m8 10-4 6h4m8-6 4 6h-4M10 19l2 3 2-3"/><circle cx="12" cy="9" r="2"/>',
 magnet:'<path d="M4 4v10a8 8 0 0 0 16 0V4h-5v10a3 3 0 0 1-6 0V4Z"/><path d="M4 8h5m6 0h5"/>',
 double:'<path d="M3 8c1-5 8-4 8 0 0 3-7 5-7 9h8m3-9 6 8m0-8-6 8"/>',
 sneakers:'<path d="M3 6h5l3 6 9 3v5H3Z"/><path d="M3 17h17M9 9l-3 2m5 1-3 2m6 0-3 2"/>'
};
export const powerupMeta={jet:{label:'Reaktiv parvoz',color:0x65dbff},magnet:{label:'Tanga magniti',color:0xff5263},double:{label:'2× ball',color:0xffd34f},sneakers:{label:'Super krossovka',color:0xb9fb54}};
export function powerupIcon(type){return `<svg class="power-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[type]??''}</svg>`}
export function createPowerup(type){
 const root=new T.Group(),visual=new T.Group();root.add(visual);root.userData.powerupVisual=visual;root.userData.type=type;
 if(type==='jet'){
  mesh(visual,new T.CylinderGeometry(.17,.18,.65,16),0xe7eef4);
  mesh(visual,new T.ConeGeometry(.18,.32,16),0xff5a53,0,.48);
  mesh(visual,new T.CylinderGeometry(.12,.19,.16,12),0x263d56,0,-.4);
  const window=mesh(visual,new T.SphereGeometry(.09,12,8),0x4dccff,0,.12,.145);window.scale.z=.25;
  for(let i=0;i<3;i++){const fin=block(visual,.06,.3,.28,0x309ac9);fin.position.set(Math.sin(i*2*Math.PI/3)*.18,-.22,Math.cos(i*2*Math.PI/3)*.18);fin.rotation.y=i*2*Math.PI/3;fin.rotation.z=.2;}
  const flame=mesh(visual,new T.ConeGeometry(.1,.35,12),0xffc75a,0,-.65);flame.rotation.x=Math.PI;root.userData.flame=flame;
 }else if(type==='magnet'){
  const s=new T.Shape();s.moveTo(-.4,.38);s.lineTo(-.4,-.08);s.absarc(0,-.08,.4,Math.PI,Math.PI*2,false);s.lineTo(.4,.38);s.lineTo(.21,.38);s.lineTo(.21,-.08);s.absarc(0,-.08,.21,0,-Math.PI,true);s.lineTo(-.21,.38);s.closePath();
  extrude(visual,s,.18,0xf34b5b);for(const x of [-.305,.305])block(visual,.2,.16,.21,0xe1eff5,x,.34);
  for(const r of [.53,.7]){const field=mesh(visual,new T.TorusGeometry(r,.012,6,40,Math.PI*1.4),0x5fe0ff);field.rotation.z=-.2;}
 }else if(type==='double'){
  const two=mesh(visual,new TextGeometry('2',{font,size:.72,depth:.13,curveSegments:5,bevelEnabled:true,bevelThickness:.018,bevelSize:.015,bevelSegments:2}),0xffd34f,-.5,-.35,-.06);
  for(const angle of [-Math.PI/4,Math.PI/4]){const bar=block(visual,.1,.5,.14,0xffe28a,.32,0);bar.rotation.z=angle;}
 }else if(type==='sneakers'){
  const sole=new T.Shape();sole.moveTo(-.47,-.2);sole.lineTo(.4,-.2);sole.quadraticCurveTo(.56,-.17,.51,-.06);sole.lineTo(-.47,-.06);sole.closePath();extrude(visual,sole,.34,0xf0fcff);
  const top=new T.Shape();top.moveTo(-.43,-.06);top.lineTo(.47,-.06);top.quadraticCurveTo(.44,.17,.12,.2);top.lineTo(-.08,.4);top.lineTo(-.4,.38);top.closePath();extrude(visual,top,.3,0x32a8cf);
  for(let i=0;i<4;i++){const lace=block(visual,.035,.035,.34,0xffffff,-.08+i*.06,.43-i*.06);lace.rotation.z=-.3;}
  for(const side of [-1,1])for(let i=0;i<3;i++){const stripe=block(visual,.04,.17,.025,0xb9fb54,-.24+i*.12,.06,side*.18);stripe.rotation.z=-.35;}
 }
 const color=powerupMeta[type].color;
 const ringMaterial=new T.MeshBasicMaterial({color,transparent:true,opacity:.28,blending:T.AdditiveBlending,depthWrite:false});
 const halo=new T.Mesh(new T.TorusGeometry(.58,.018,6,40),ringMaterial);halo.rotation.x=Math.PI/2;halo.position.y=-.5;visual.add(halo);
 const sparkGeometry=new T.SphereGeometry(.025,6,4);const sparks=[];
 for(let i=0;i<8;i++)sparks.push(mesh(visual,sparkGeometry,color));root.userData.sparks=sparks;
 return root;
}
export function updatePowerup(root,dt,time){
 const visual=root.userData.powerupVisual;if(!visual)return;
 visual.position.y=Math.sin(time*2.1)*.09;
 // A full turn would mirror the text from behind. Rock the 3D glyph instead.
 if(root.userData.type==='double')visual.rotation.y=Math.sin(time*.7)*.3;else visual.rotation.y+=dt*.7;
 if(root.userData.flame)root.userData.flame.scale.y=.8+Math.sin(time*19)*.2;
 root.userData.sparks.forEach((spark,i)=>{const angle=time*1.6+i*Math.PI/4;spark.position.set(Math.cos(angle)*.58,Math.sin(angle*1.7)*.4,Math.sin(angle)*.58)});
}
