import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const cache=new Map(),textureCache=new Map();
const base=`${import.meta.env?.BASE_URL??'/'}models/characters/`;
export const characterAssetInfo={};
function texture(name,color=true){
  if(!textureCache.has(name))textureCache.set(name,new T.TextureLoader().loadAsync(base+name).then(t=>{
    t.colorSpace=color?T.SRGBColorSpace:T.NoColorSpace;t.anisotropy=4;return t;
  }));return textureCache.get(name);
}
export function getCharacterAsset(id){
  if(cache.has(id))return cache.get(id);
  characterAssetInfo[id]={status:'loading'};
  const promise=new GLTFLoader().loadAsync(`${base}${id==='aziz'?'aziz-soldier':id}.glb`).then(async gltf=>{
    let color,normal,lenses,sole;
    if(id==='aziz')color=await texture('soldier-color.png');
    if(id==='sardor')[color,normal,lenses,sole]=await Promise.all([texture('tasm-color.jpg'),texture('tasm-normal.jpg',false),texture('tasm-lenses.jpg'),texture('tasm-sole.jpg')]);
    gltf.scene.traverse(mesh=>{
      if(!mesh.isMesh)return;
      mesh.castShadow=mesh.receiveShadow=true;
      for(const material of [mesh.material].flat()){
        if(id==='aziz'||(id==='sardor'&&mesh.name==='Body_for_surface_modifier')){
          material.map=color;material.normalMap=normal;if(material.normalMap)material.normalScale.setScalar(.45);material.color.setHex(0xffffff);
        }else if(id==='sardor'&&mesh.name==='Lenses'){material.map=lenses;material.color.setHex(0xffffff);material.roughness=.25;}
        else if(id==='sardor'&&mesh.name==='Sole'){material.map=sole;material.color.setHex(0xffffff);}
        material.needsUpdate=true;
      }
    });
    const asset={scene:gltf.scene,animations:gltf.animations,facing:Math.PI,id};
    characterAssetInfo[id]={status:'ready',sourceClips:gltf.animations.map(c=>c.name),generatedRig:id==='aziz'};
    return asset;
  }).catch(error=>{characterAssetInfo[id]={status:'error',error:error.message};throw error});
  cache.set(id,promise);return promise;
}
export function preloadCharacters(){return Promise.allSettled(['aziz','lola','sardor'].map(getCharacterAsset));}
