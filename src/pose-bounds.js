import * as T from 'three';
// Include limb extrema plus distributed surface samples; avoid skinning 100k+
// vertices on the CPU each frame just to compute the gameplay capsule.
export function createPoseBounds(root){
 const meshes=[],point=new T.Vector3();
 root.traverse(mesh=>{
  if(!mesh.isMesh)return;const p=mesh.geometry.attributes.position,count=p.count,indices=new Set();
  const stride=Math.max(1,Math.ceil(count/1400));for(let i=0;i<count;i+=stride)indices.add(i);
  const groups=new Map(),si=mesh.geometry.attributes.skinIndex,sw=mesh.geometry.attributes.skinWeight;
  for(let i=0;i<count;i++){
   let bone=0;if(si){let weight=-1;for(let j=0;j<4;j++)if(sw.array[i*4+j]>weight){weight=sw.array[i*4+j];bone=si.array[i*4+j]}}
   let g=groups.get(bone);if(!g){g={min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity],lo:[],hi:[]};groups.set(bone,g)}
   const v=[p.getX(i),p.getY(i),p.getZ(i)];for(let axis=0;axis<3;axis++){
    if(v[axis]<g.min[axis]){g.min[axis]=v[axis];g.lo[axis]=i}if(v[axis]>g.max[axis]){g.max[axis]=v[axis];g.hi[axis]=i}
   }
  }
  groups.forEach(g=>[...g.lo,...g.hi].forEach(i=>indices.add(i)));meshes.push({mesh,indices:[...indices]});
 });
 return bounds=>{bounds.makeEmpty();for(const{mesh,indices}of meshes)for(const i of indices){mesh.getVertexPosition(i,point).applyMatrix4(mesh.matrixWorld);bounds.expandByPoint(point)}return bounds};
}
