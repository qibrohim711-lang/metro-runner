import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {maps,getMap,EnvironmentCycle,weatherLabels} from './maps.js';

const cube=new T.BoxGeometry(1,1,1),sphere=new T.SphereGeometry(1,10,7),cone=new T.ConeGeometry(1,1,8),cylinder=new T.CylinderGeometry(1,1,1,10);
// Static scenery is merged by material: many details, a bounded number of draw calls.
function tile(id,index,detail){const root=new T.Group(),batches=new Map();
 const add=(geo,x,y,z,sx,sy,sz,color,glow=false,rz=0)=>{const key=color+':'+glow;if(!batches.has(key))batches.set(key,{color,glow,geos:[]});const g=geo.clone();g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(0,0,rz)),new T.Vector3(sx,sy,sz)));batches.get(key).geos.push(g)};
 const box=(x,y,z,w,h,d,c,e=false)=>add(cube,x,y,z,w,h,d,c,e);
 const orb=(x,y,z,r,c)=>add(sphere,x,y,z,r,r,r,c);
 const theme=getMap(id),night=id==='neon'||id==='space';
 box(0,-.58,0,70,.4,24,theme.ground);
 for(const side of [-1,1]){
 const x=side*10,h=9+(index*7%17);
 box(side*6,-.05,0,1,.65,24,id==='snow'?0xedf5fa:id==='desert'?0xe7b67d:0x99a8b5);
 if(id==='metro'||id==='neon'){
  const color=id==='neon'?[0x283052,0x343357,0x243b50][index%3]:[0xb5cbd1,0xc4afa4,0x90adb4][index%3];
  box(x,h/2,0,6,h,14,color);box(x,h+.3,0,6.2,.6,14.2,night?0x435074:0xe2e1da);
  for(let y=2;y<h-1;y+=2.5)for(let z=-5;z<=5;z+=2.5)box(side*6.96,y,z,.06,1.2,1.3,night?(index%2?0xff72db:0x69deef):0x35546b,night);
  box(x,h+1.1,-3,1.6,1.1,2,0x637586);
  if(night){box(side*6.9,h/2,-6,.12,h,.15,0xeb5de3,true);box(side*6.9,4,2,.12,2,5,0x46eeed,true);box(side*6.78,4,2,.14,.2,3,0xffffff,true)}
  else{box(side*7,.9,7,.3,2,.3,0x775d4e);orb(side*7,3.1,7,1.45,0x398d72);box(side*6.9,.6,-6,1,.22,2,0x8a6452);box(side*7.3,1,-6,.15,1,2,0x8a6452)}
 }else if(id==='desert'){
  add(sphere,side*20,1,-4,10,5+(index%3)*2,14,0xd9ac73);
  add(cone,side*12,2.6,3,3,6,3,0xaf7955);add(cone,side*15,1.6,-6,2,4,2,0xbf8b5b);
  box(side*7.8,1.6,-6,.45,3.4,.5,0x48856b);box(side*8.5,2.1,-6,1.3,.3,.4,0x48856b);box(side*9,2.6,-6,.35,1.2,.4,0x48856b);
  if(index%3===0){box(side*9,1,6,4,2,4,0xdcc499);box(side*9,2.2,6,4.5,.35,4.5,0x9d6349);box(side*6.95,1,6,.1,1.4,1,0x39596a)}
 }else if(id==='snow'){
  box(x,2.2,0,6,4.4,10,0x657d99);add(cone,x,5.5,0,4.8,3,7,0xf0f4f5);box(side*6.96,2,0,.08,1,1.5,0xffd99a,true);
  for(const z of [-8,8]){box(side*8,1.5,z,.4,3,.4,0x61554c);add(cone,side*8,3.2,z,1.7,3,1.7,0x3c6864);add(cone,side*8,3.65,z,1.65,2.4,1.65,0xe7f1f2)}
  add(sphere,side*6.6,.15,4,1.3,.45,2.5,0xf2f6f8);
 }else{
  box(side*11,1,0,8,2,24,0x28354f);box(side*7.1,1.8,0,.14,.14,24,0x77dcff,true);
  for(const z of [-8,0,8]){box(side*8,5,z,.6,8,.6,0x53617c);box(side*8,8.8,z,.8,.22,2,0x7ddfff,true);add(cylinder,side*11,4,z,1.5,5,1.5,0x3e566e);add(cylinder,side*11,4,z,1.53,.35,1.53,0x6ce9fc,true)}
  if(index%3===0){box(0,9,-7,17,.5,.65,0x53617c);box(0,8.7,-7,14,.08,.2,0x84ddff,true)}
 }
 if(id!=='space'){
  box(side*5.8,2.7,-8,.13,5.4,.13,night?0x495773:0x647c89);box(side*5.2,5.4,-8,1.3,.12,.2,0x647c89);box(side*4.7,5.3,-8,.45,.12,.4,night?0x97f6ff:0xffe5b5,true);
 }
 if(detail){box(side*5.6,.45,3,.25,.9,.35,theme.accent);box(side*5.7,.13,6,.6,.12,1,0x405164)}
 }
 if(id==='metro'&&index%4===0){box(-5.3,4,-9,.4,8,.5,0x405c73);box(5.3,4,-9,.4,8,.5,0x405c73);box(0,8,-9,11,.4,.5,0x405c73)}
 for(const {geos,color,glow} of batches.values()){const geometry=mergeGeometries(geos,false);geos.forEach(g=>g.dispose());const material=new T.MeshStandardMaterial({color,roughness:glow?.35:.8,emissive:glow?color:0,emissiveIntensity:glow?.8:0,transparent:true});material.userData.baseRoughness=material.roughness;const mesh=new T.Mesh(geometry,material);mesh.castShadow=!glow;mesh.receiveShadow=true;root.add(mesh)}return root;
}
export function createEnvironment(scene,renderer,sun,hemi,onChange=()=>{}){
 const cycle=new EnvironmentCycle(),layers=new Map(),roots=[];let quality='medium',time=0,current='metro';
 for(const map of maps){const layer=new T.Group();layer.visible=false;scene.add(layer);const segments=[];for(let i=0;i<12;i++){const segment=tile(map.id,i,true);segment.position.z=-i*24;layer.add(segment);segments.push(segment)}layers.set(map.id,{layer,segments});roots.push(layer)}
 // The continuous track has the same coordinates and collision surface in every environment.
 const track=new T.Group();scene.add(track);const trackSegments=[];
 for(let i=0;i<12;i++){const g=new T.Group();g.position.z=-i*24;track.add(g);const mesh=(x,y,z,w,h,d,c)=>{const m=new T.Mesh(cube,new T.MeshStandardMaterial({color:c,metalness:.35,roughness:.55}));m.position.set(x,y,z);m.scale.set(w,h,d);m.receiveShadow=true;g.add(m)};mesh(0,-.3,0,11,.4,24,0x455666);for(const x of [-3,0,3]){mesh(x,-.05,0,2.65,.1,24,0x273d50);for(const s of [-1,1])mesh(x+s*.9,.07,0,.08,.12,24,0xa8bcc9);for(let z=-11;z<12;z+=2)mesh(x,.015,z,2.3,.1,.2,0x7d776d)}const grouped=new Map();for(const child of [...g.children]){const key=child.material.color.getHex();if(!grouped.has(key))grouped.set(key,{material:child.material,geometries:[]});child.updateMatrix();grouped.get(key).geometries.push(child.geometry.clone().applyMatrix4(child.matrix));if(child.material!==grouped.get(key).material)child.material.dispose();g.remove(child)}for(const batch of grouped.values()){const mesh=new T.Mesh(mergeGeometries(batch.geometries),batch.material);mesh.receiveShadow=true;g.add(mesh);batch.geometries.forEach(geo=>geo.dispose())}trackSegments.push(g)}
 const skyMaterial=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color()},bottom:{value:new T.Color()}},vertexShader:'varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 v;uniform vec3 top;uniform vec3 bottom;void main(){float h=smoothstep(-.08,.7,normalize(v).y);gl_FragColor=vec4(mix(bottom,top,h),1.);#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'});
 // Shader includes need their own line.
 skyMaterial.fragmentShader=skyMaterial.fragmentShader.replace(';#include',';\n#include');
 const sky=new T.Mesh(new T.SphereGeometry(240,24,14),skyMaterial);sky.frustumCulled=false;scene.add(sky);
 const clouds=new T.Group();scene.add(clouds);const cloudMat=new T.MeshBasicMaterial({color:0xf1f5fa,transparent:true,opacity:.38,depthWrite:false});for(let i=0;i<14;i++){const m=new T.Mesh(sphere,cloudMat);m.position.set((i%2?1:-1)*(15+i*2),25+i%4*3,-15-i*13);m.scale.set(8,1.5,3);clouds.add(m)}
 const planet=new T.Mesh(new T.SphereGeometry(22,24,16),new T.MeshBasicMaterial({color:0x657eac}));planet.position.set(75,65,-170);scene.add(planet);const planetRing=new T.Mesh(new T.TorusGeometry(31,1.8,6,48),new T.MeshBasicMaterial({color:0xb39bd5}));planetRing.position.copy(planet.position);planetRing.rotation.x=1.1;scene.add(planetRing);
 const count=900,positions=new Float32Array(count*3),velocities=new Float32Array(count);for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*42;positions[i*3+1]=Math.random()*25;positions[i*3+2]=-Math.random()*95;velocities[i]=.6+Math.random()}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(positions,3));const material=new T.PointsMaterial({size:.085,color:0xb9d9f2,transparent:true,opacity:0,depthWrite:false});const precipitation=new T.Points(geo,material);precipitation.frustumCulled=false;scene.add(precipitation);
 const aurora=new T.Group();const auroraMaterial=new T.MeshBasicMaterial({color:0x7fffe1,transparent:true,opacity:.14,depthWrite:false,side:T.DoubleSide});for(let i=0;i<3;i++){const ribbon=new T.Mesh(new T.TorusGeometry(90+i*8,2,4,60,Math.PI),auroraMaterial);ribbon.position.set(0,42+i*7,-130);ribbon.rotation.set(.4,0,i*.2);aurora.add(ribbon)}scene.add(aurora);
 const rainPositions=new Float32Array(count*6),rainGeo=new T.BufferGeometry();rainGeo.setAttribute('position',new T.BufferAttribute(rainPositions,3));const rainMaterial=new T.LineBasicMaterial({color:0xbed9ef,transparent:true,opacity:0,depthWrite:false});const rain=new T.LineSegments(rainGeo,rainMaterial);rain.frustumCulled=false;scene.add(rain);
 const starGeo=new T.BufferGeometry(),starPositions=[];for(let i=0;i<500;i++)starPositions.push((Math.random()-.5)*350,20+Math.random()*160,-60-Math.random()*140);starGeo.setAttribute('position',new T.Float32BufferAttribute(starPositions,3));const stars=new T.Points(starGeo,new T.PointsMaterial({color:0xd1e7ff,size:.3,transparent:true,depthWrite:false}));scene.add(stars);
 const portal=new T.Group();scene.add(portal);const portalMat=new T.MeshBasicMaterial({color:0xa5edff,transparent:true,opacity:0,depthWrite:false});for(let i=0;i<3;i++){const ring=new T.Mesh(new T.TorusGeometry(6+i*.22,.08,6,48),portalMat);ring.position.z=-i*1.2;portal.add(ring)}portal.visible=false;
 const drone=new T.Group();const droneMat=new T.MeshStandardMaterial({color:0x718b9e,metalness:.65,roughness:.3});const droneBody=new T.Mesh(cube,droneMat);droneBody.scale.set(.9,.2,.5);drone.add(droneBody);for(const s of [-1,1]){const light=new T.Mesh(sphere,new T.MeshBasicMaterial({color:0x9deeff}));light.position.x=s*.6;light.scale.set(.12,.04,.12);drone.add(light)}scene.add(drone);
 function style(mapId,weather){const m=getMap(mapId),night=mapId==='neon'||mapId==='space';const dim=weather==='cloudy'||weather==='rain';return {sky:new T.Color(m.sky).multiplyScalar(dim?.65:1),horizon:new T.Color(m.horizon).multiplyScalar(dim?.7:1),sun:night?.65:dim?1.35:2.6,ambient:night?1.6:2.2,fogNear:weather==='mist'?24:weather==='sand'?35:60,fogFar:weather==='mist'?115:weather==='sand'?135:210}}
 function atmosphere(from,to,t){skyMaterial.uniforms.top.value.copy(from.sky).lerp(to.sky,t);skyMaterial.uniforms.bottom.value.copy(from.horizon).lerp(to.horizon,t);scene.fog.color.copy(skyMaterial.uniforms.bottom.value);scene.fog.near=T.MathUtils.lerp(from.fogNear,to.fogNear,t);scene.fog.far=T.MathUtils.lerp(from.fogFar,to.fogFar,t);sun.intensity=T.MathUtils.lerp(from.sun,to.sun,t);hemi.intensity=T.MathUtils.lerp(from.ambient,to.ambient,t)}
 function opacity(id,value){const {layer}=layers.get(id);layer.visible=value>.001;if(!layer.visible)return;layer.traverse(n=>{if(n.isMesh){n.material.opacity=value;n.material.depthWrite=value>.98}})}
 function apply(dt,travel){const tr=cycle.transition,progress=tr?T.MathUtils.smoothstep(tr.time,0,2.6):1,fromId=tr?.fromMap||cycle.map,toId=tr?.map||cycle.map,fromWeather=tr?.fromWeather||cycle.weather,weather=tr?.weather||cycle.weather;
  if(fromId!==toId){opacity(fromId,1-progress);opacity(toId,progress)}else opacity(toId,1);
  atmosphere(style(fromId,fromWeather),style(toId,weather),progress);
  for(const m of maps)if(m.id!==fromId&&m.id!==toId)opacity(m.id,0);
  const spaceMix=T.MathUtils.lerp(fromId==='space'?1:0,toId==='space'?1:0,progress);stars.visible=spaceMix>0;stars.material.opacity=spaceMix*(weather==='pulse'?.5+.25*Math.sin(time*1.5):.8);planet.visible=planetRing.visible=spaceMix>.5;const auroraWeight=w=>w==='aurora'?1:0;aurora.visible=spaceMix>0;auroraMaterial.opacity=T.MathUtils.lerp(auroraWeight(fromWeather),auroraWeight(weather),progress)*spaceMix*(.13+.04*Math.sin(time));aurora.rotation.z=Math.sin(time*.1)*.06;sun.color.set(toId==='space'?(weather==='pulse'?0xc8a8ff:weather==='aurora'?0x9effde:0xc6e6ff):toId==='neon'?0xb4c2ff:0xffefcd);
  const cloudAlpha=w=>w==='cloudy'?.65:w==='rain'?.7:w==='clear'?.16:0;cloudMat.opacity=T.MathUtils.lerp(cloudAlpha(fromWeather),cloudAlpha(weather),progress)*(1-spaceMix);clouds.position.x=Math.sin(time*.04)*5;
  const particleWeather=['rain','snow','sand'];const weight=w=>particleWeather.includes(w)?.7:0;material.opacity=T.MathUtils.lerp(weight(fromWeather),weight(weather),progress);if(fromWeather!==weather&&weight(fromWeather)&&weight(weather))material.opacity*=Math.abs(progress*2-1);precipitation.visible=material.opacity>.001;const visual=progress<.5?fromWeather:weather;material.size=visual==='snow'?.13:visual==='sand'?.09:.055;material.color.set(visual==='snow'?0xf4fbff:visual==='sand'?0xe6c197:0xb1dcf5);geo.setDrawRange(0,quality==='low'?130:quality==='medium'?420:count);
  if(precipitation.visible&&dt>0){for(let i=0;i<count;i++){positions[i*3+1]-=dt*(visual==='rain'?28:visual==='snow'?2:1)*velocities[i];positions[i*3]+=dt*(visual==='sand'?6:Math.sin(time+i)*.25);positions[i*3+2]+=travel*.8;if(positions[i*3+1]<0)positions[i*3+1]=25;if(positions[i*3]>21)positions[i*3]=-21;if(positions[i*3+2]>12)positions[i*3+2]=-95}geo.attributes.position.needsUpdate=true}rain.visible=visual==='rain'&&material.opacity>.001;rainMaterial.opacity=material.opacity*.6;rainGeo.setDrawRange(0,(quality==='low'?130:quality==='medium'?420:count)*2);if(rain.visible){precipitation.visible=false;for(let i=0;i<count;i++){rainPositions.set([positions[i*3],positions[i*3+1],positions[i*3+2],positions[i*3]+.06,positions[i*3+1]+.6,positions[i*3+2]-.12],i*6)}rainGeo.attributes.position.needsUpdate=true}
  const wet=T.MathUtils.lerp(fromWeather==='rain'?1:0,weather==='rain'?1:0,progress);for(const g of trackSegments)for(const mesh of g.children)mesh.material.roughness=.6-wet*.4;
  portal.visible=!!tr?.mapChanged;portalMat.opacity=portal.visible?Math.sin(progress*Math.PI)*.7:0;portal.position.set(0,3,-40+Math.min(1,(tr?.time||0)/1.3)*48);portal.rotation.z=time*.3;
  drone.visible=quality!=='low'&&toId!=='desert'&&toId!=='snow';drone.position.set(9+Math.sin(time*.45)*2,9+Math.sin(time)*.4,-35+(time*4%110));drone.rotation.z=Math.sin(time*.8)*.1;
 }
 function reset(id){cycle.reset(id);current=cycle.map;for(const map of maps){opacity(map.id,map.id===current?1:0);layers.get(map.id).segments.forEach((s,i)=>s.position.z=-i*24)}trackSegments.forEach((s,i)=>s.position.z=-i*24);time=0;apply(0,0)}
 function setQuality(value){quality=value;renderer.setPixelRatio(Math.min(devicePixelRatio,value==='low'?1:value==='medium'?1.5:2));renderer.shadowMap.enabled=value!=='low';sun.shadow.mapSize.set(value==='high'?2048:1024,value==='high'?2048:1024);sun.shadow.map?.dispose();sun.shadow.map=null;renderer.shadowMap.needsUpdate=true}
 const previewCache=new Map();function preview(id){if(previewCache.has(id))return previewCache.get(id);const previewScene=new T.Scene();const p=getMap(id);previewScene.background=new T.Color(p.sky);previewScene.fog=new T.Fog(p.sky,45,150);previewScene.add(new T.HemisphereLight(0xe6f6ff,0x536078,2.4));const light=new T.DirectionalLight(0xffefd7,2);light.position.set(12,25,10);previewScene.add(light);const clone=layers.get(id).layer.clone(true);clone.visible=true;previewScene.add(clone);clone.traverse(n=>{if(n.isMesh){n.material=n.material.clone();n.material.opacity=1;n.material.depthWrite=true}});previewScene.add(track.clone(true));const cam=new T.PerspectiveCamera(60,2,.1,260);cam.position.set(3,6,15);cam.lookAt(0,3,-32);const target=new T.WebGLRenderTarget(360,180);const previous=renderer.getRenderTarget();renderer.setRenderTarget(target);renderer.render(previewScene,cam);const pixels=new Uint8Array(360*180*4);renderer.readRenderTargetPixels(target,0,0,360,180,pixels);renderer.setRenderTarget(previous);const canvas=document.createElement('canvas');canvas.width=360;canvas.height=180;const ctx=canvas.getContext('2d'),data=ctx.createImageData(360,180);for(let y=0;y<180;y++)data.data.set(pixels.subarray((179-y)*360*4,(180-y)*360*4),y*360*4);ctx.putImageData(data,0,0);const url=canvas.toDataURL();target.dispose();clone.traverse(n=>{if(n.isMesh)n.material.dispose()});previewCache.set(id,url);return url}
 reset('metro');return {cycle,reset,setQuality,preview,get protected(){return cycle.protected},get label(){const tr=cycle.transition;return getMap(tr?.map||cycle.map).name+' · '+weatherLabels[tr?.weather||cycle.weather]},update(dt,travel,score,unlocked){time+=dt;const old=cycle.transition;const event=cycle.update(dt,score,unlocked);if(old&&!cycle.transition)opacity(old.fromMap,old.fromMap===cycle.map?1:0);if(event){if(current!==event.map&&event.mapChanged)onChange('Yangi hudud: '+getMap(event.map).name);else onChange(weatherLabels[event.weather]);current=event.map}for(const {segments}of layers.values())for(const s of segments){s.position.z+=travel;if(s.position.z>24)s.position.z-=288}for(const s of trackSegments){s.position.z+=travel;if(s.position.z>24)s.position.z-=288}apply(dt,travel)},idle(dt){time+=dt;apply(dt,0)}};
}
