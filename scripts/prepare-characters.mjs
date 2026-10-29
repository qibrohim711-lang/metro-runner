import fs from 'node:fs/promises';
import * as T from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
globalThis.window={URL};
globalThis.FileReader=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.()})}};
const manager=new T.LoadingManager();manager.addHandler(/.*/,{setPath(){return this},load(){return new T.Texture()}});
const roles=['Hips','Spine','Spine1','Spine2','Neck','Head','LeftShoulder','LeftArm','LeftForeArm','LeftHand','RightShoulder','RightArm','RightForeArm','RightHand','LeftUpLeg','LeftLeg','LeftFoot','RightUpLeg','RightLeg','RightFoot'];
const parents={Hips:null,Spine:'Hips',Spine1:'Spine',Spine2:'Spine1',Neck:'Spine2',Head:'Neck'};
for(const s of ['Left','Right'])Object.assign(parents,{[s+'Shoulder']:'Spine2',[s+'Arm']:s+'Shoulder',[s+'ForeArm']:s+'Arm',[s+'Hand']:s+'ForeArm',[s+'UpLeg']:'Hips',[s+'Leg']:s+'UpLeg',[s+'Foot']:s+'Leg'});
function role(name){
 name=name.replace(/^mixamorig:?/,'');if(roles.includes(name))return name;
 if(name.startsWith('LeftHand')||name.startsWith('RightHand'))return name.startsWith('Left')?'LeftHand':'RightHand';
 if(name.startsWith('LeftToe'))return 'LeftFoot';if(name.startsWith('RightToe'))return 'RightFoot';
 const m=/^DEF-(upper_arm|forearm|hand|thigh|shin|foot|toe|shoulder|f_\w+|thumb\w+|palm\w+)(L|R)(001)?$/.exec(name);
 if(m){const side=m[2]==='L'?'Left':'Right';return side+({upper_arm:'Arm',forearm:'ForeArm',hand:'Hand',thigh:'UpLeg',shin:'Leg',foot:'Foot',toe:'Foot',shoulder:'Shoulder'}[m[1]]||'Hand')}
 const spine=/^DEF-spine(\d+)?$/.exec(name);if(spine)return ['Hips','Spine','Spine1','Spine2','Neck','Neck','Head'][Number(spine[1]||0)]||'Head';
 if(/^DEF-pelvis/.test(name))return'Hips';return'Hips';
}
function canonicalPositions(){return{Hips:[0,1.15,0],Spine:[0,1.34,0],Spine1:[0,1.56,0],Spine2:[0,1.76,0],Neck:[0,1.96,0],Head:[0,2.06,0],
 LeftShoulder:[.18,1.86,0],LeftArm:[.32,1.81,0],LeftForeArm:[.43,1.47,.01],LeftHand:[.47,1.02,.02],RightShoulder:[-.18,1.86,0],RightArm:[-.32,1.81,0],RightForeArm:[-.43,1.47,.01],RightHand:[-.47,1.02,.02],
 LeftUpLeg:[.18,1.13,0],LeftLeg:[.23,.64,-.04],LeftFoot:[.3,.12,-.05],RightUpLeg:[-.18,1.13,0],RightLeg:[-.23,.64,-.04],RightFoot:[-.3,.12,-.05]}}
function skinNear(point,positions){
 const options=[];for(const r of roles){if(r==='Head'){options.push([r,point.distanceToSquared(positions[r])]);continue}const child=roles.find(c=>parents[c]===r);if(!child){options.push([r,point.distanceToSquared(positions[r])]);continue;}
 const a=positions[r],b=positions[child],d=b.clone().sub(a),t=T.MathUtils.clamp(point.clone().sub(a).dot(d)/d.lengthSq(),0,1);
 options.push([r,point.distanceToSquared(a.clone().addScaledVector(d,t))]);}
 // The supplied soldier is a static mesh. Bind each surface to nearby anatomical segments.
 const side=point.x>0?'Left':'Right';
 let candidates=Math.abs(point.x)>.355&&point.y>.88&&point.y<1.91?options.filter(([r])=>r.startsWith(side)&&/Arm|Hand/.test(r)):point.y<1.13?options.filter(([r])=>r.startsWith(side)&&/UpLeg|Leg|Foot/.test(r)):
 point.y>1.94?options.filter(([r])=>/Head|Neck/.test(r)):options.filter(([r])=>/Spine|Hips/.test(r));
 candidates.sort((a,b)=>a[1]-b[1]);const closest=candidates.slice(0,2),weights=closest.map(([,d])=>1/(d+.002));const sum=weights.reduce((a,b)=>a+b,0);
 return{indices:closest.map(([r])=>roles.indexOf(r)),weights:weights.map(w=>w/sum)};
}
const files={aziz:'assets-source/characters/Soldier/Near_future_soldier__0123183948_fbx/Near_future_soldier__0123183948.fbx',lola:'assets-source/characters/Hulk.fbx',sardor:'assets-source/characters/TASM 2/other format/TASM 2.fbx'};
for(const[id,path]of Object.entries(files).filter(([id])=>!process.argv.includes('--free-only')||id==='aziz')){
 const bytes=await fs.readFile(path);const source=path.toLowerCase().endsWith('.obj')?new OBJLoader().parse(bytes.toString()):new FBXLoader(manager).parse(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');source.updateMatrixWorld(true);
 const bounds=new T.Box3().setFromObject(source),height=bounds.max.y-bounds.min.y,center=bounds.getCenter(new T.Vector3());
 const normalize=p=>p.sub(new T.Vector3(center.x,bounds.min.y,center.z)).multiplyScalar(2.3/height);
 const positions=Object.fromEntries(Object.entries(canonicalPositions()).map(([k,p])=>[k,new T.Vector3(...p)]));
 if(id!=='aziz'){
   const seen=new Set();source.traverse(b=>{if(!b.isBone||b.position.lengthSq()<1e-8)return;const r=role(b.name);if(seen.has(r))return;
    if(id==='sardor'&&!b.name.startsWith('DEF-'))return;if(id==='lola'&&!/^mixamorig/.test(b.name))return;
    seen.add(r);positions[r]=normalize(b.getWorldPosition(new T.Vector3()));});
 }
 const group=new T.Group();group.name=`Metro_${id}`;group.userData={characterId:id,sourceClips:source.animations.map(a=>a.name),rig:id==='aziz'?'generated-scan-rig':'retargeted-deform-rig',facing:Math.PI};
 const bones=Object.fromEntries(roles.map(r=>{const b=new T.Bone();b.name=r;return[r,b]}));
 for(const r of roles){const parent=parents[r];bones[r].position.copy(positions[r]);if(parent){bones[r].position.sub(positions[parent]);bones[parent].add(bones[r])}else group.add(bones[r]);}
 group.updateMatrixWorld(true);const skeleton=new T.Skeleton(roles.map(r=>bones[r]));skeleton.calculateInverses();
 const meshes=[];source.traverse(o=>{if(o.isMesh)meshes.push(o)});const grid=new Map();const cell=.025;
 const key=p=>`${Math.floor(p.x/cell)},${Math.floor(p.y/cell)},${Math.floor(p.z/cell)}`;
 const reference=[];
 for(const mesh of meshes.filter(m=>m.isSkinnedMesh&&(id!=='sardor'||m.name==='Body_for_surface_modifier'))){
  const si=mesh.geometry.attributes.skinIndex,sw=mesh.geometry.attributes.skinWeight;
  for(let i=0;i<mesh.geometry.attributes.position.count;i++){
   const p=normalize(mesh.getVertexPosition(i,new T.Vector3()).applyMatrix4(mesh.matrixWorld));const weights={};
   for(let j=0;j<4;j++){const index=si.array[i*4+j],w=sw.array[i*4+j];const r=role(mesh.skeleton.bones[index].name);weights[r]=(weights[r]||0)+w;}
   const pairs=Object.entries(weights).sort((a,b)=>b[1]-a[1]).slice(0,4);const skin={indices:pairs.map(([r])=>roles.indexOf(r)),weights:pairs.map(([,w])=>w)};
   reference.push({p,skin});const k=key(p);if(!grid.has(k))grid.set(k,{p,skin});
  }
 }
 function nearest(p){const ix=Math.floor(p.x/cell),iy=Math.floor(p.y/cell),iz=Math.floor(p.z/cell);let best,dist=Infinity;
  for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)for(let z=-2;z<=2;z++){const v=grid.get(`${ix+x},${iy+y},${iz+z}`);if(v){const d=p.distanceToSquared(v.p);if(d<dist){best=v;dist=d}}}
  return best?.skin||skinNear(p,positions);}
 let vertexCount=0;
 for(const mesh of meshes){
  const input=mesh.geometry,geometry=input.clone(),pos=geometry.attributes.position,normalMatrix=new T.Matrix3().getNormalMatrix(mesh.matrixWorld),indices=[],weights=[];
  const si=input.attributes.skinIndex,sw=input.attributes.skinWeight;
  for(let i=0;i<pos.count;i++){
   const p=normalize(mesh.getVertexPosition(i,new T.Vector3()).applyMatrix4(mesh.matrixWorld));pos.setXYZ(i,p.x,p.y,p.z);
   let skin;
   if(mesh.isSkinnedMesh&&!(id==='sardor'&&mesh.name==='Sole')){const combined={};for(let j=0;j<4;j++){const r=role(mesh.skeleton.bones[si.array[i*4+j]].name);combined[r]=(combined[r]||0)+sw.array[i*4+j]};const pairs=Object.entries(combined).sort((a,b)=>b[1]-a[1]).slice(0,4);skin={indices:pairs.map(([r])=>roles.indexOf(r)),weights:pairs.map(([,w])=>w)}}else skin=id==='aziz'?skinNear(p,positions):nearest(p);
   const sum=skin.weights.reduce((a,b)=>a+b,0)||1;for(let j=0;j<4;j++){indices.push(skin.indices[j]??0);weights.push((skin.weights[j]||0)/sum)}
   if(geometry.attributes.normal){const n=new T.Vector3().fromBufferAttribute(geometry.attributes.normal,i).applyMatrix3(normalMatrix).normalize();geometry.attributes.normal.setXYZ(i,n.x,n.y,n.z)}
   if(id==='sardor'&&mesh.name==='Body_for_surface_modifier'){const uv=geometry.attributes.uv,u=uv.getX(i),v=uv.getY(i),tile=Math.min(9,Math.floor(u));uv.setXY(i,((tile%5)+(u-tile))/5,(Math.floor(tile/5)+v)/2)}
   if(id==='sardor'&&mesh.name==='Lenses'){const uv=geometry.attributes.uv;uv.setXY(i,uv.getX(i)-1,uv.getY(i)-1)}
  }
  geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));
  for(const attr of Object.keys(geometry.attributes))if(!['position','normal','uv','skinIndex','skinWeight'].includes(attr))geometry.deleteAttribute(attr);
  const compact=mergeVertices(geometry,.00001);geometry.dispose();vertexCount+=compact.attributes.position.count;
  const color=id==='lola'?(mesh.name.includes('Pants')?0x624579:mesh.name.includes('Hair')?0x152415:mesh.name.includes('Mouth')?0x5a2527:mesh.name.includes('Eyes')?0xf5e9c4:0x64ab48):id==='sardor'?(mesh.name.includes('Lenses')?0xcad9e8:mesh.name.includes('Body_for')?0xffffff:0x121922):0xffffff;
  const materials=[mesh.material].flat().map((m,i)=>{const mat=new T.MeshStandardMaterial({color,roughness:.72,metalness:.03});mat.name=`${id}_${mesh.name}_${i}`;return mat});
  compact.clearGroups();const skinned=new T.SkinnedMesh(compact,materials[0]);skinned.name=mesh.name;group.add(skinned);skinned.bind(skeleton);skinned.normalizeSkinWeights();
 }
 const binary=await new GLTFExporter().parseAsync(group,{binary:true});await fs.writeFile(`public/models/characters/${id}.glb`,Buffer.from(binary));
 console.log(JSON.stringify({id,sourceClips:source.animations.map(c=>c.name),rig:group.userData.rig,vertexCount,bytes:binary.byteLength}));
}
