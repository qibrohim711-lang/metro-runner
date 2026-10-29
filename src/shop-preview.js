import * as T from 'three';
import { createAvatar } from './avatar.js';
let renderer,queue=Promise.resolve();const previews=new Map();
export function characterPreview(character){
 if(previews.has(character.id))return previews.get(character.id);
 const task=queue.then(async()=>{
  renderer??=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});
  renderer.setSize(180,220);renderer.setPixelRatio(1.5);
  const scene=new T.Scene();scene.add(new T.HemisphereLight(0xe7f8ff,0x5b5263,2.5));
  const light=new T.DirectionalLight(0xffeed8,2.5);light.position.set(-3,5,-4);scene.add(light);
  const avatar=createAvatar(error=>{throw new Error(error)},character);scene.add(avatar.g);await avatar.ready;
  avatar.update(0,{mode:'idle',grounded:true});
  const camera=new T.PerspectiveCamera(30,180/220,.1,50);camera.position.set(.7,1.65,-4.8);camera.lookAt(0,1.2,0);
  renderer.render(scene,camera);const image=renderer.domElement.toDataURL('image/png');avatar.dispose();return image;
 });
 queue=task.catch(()=>{});previews.set(character.id,task);return task;
}
