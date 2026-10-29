import fs from 'node:fs/promises';
import * as T from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Asset preparation only: preserve the supplied FBX; export a compact articulated GLB.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(value => { this.result = value; this.onloadend?.(); }); }
};
const bytes = await fs.readFile('assets-source/Enceladus.fbx');
const source = new FBXLoader().parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
source.updateMatrixWorld(true);
const bounds = new T.Box3().setFromObject(source), size = bounds.getSize(new T.Vector3());
const center = bounds.getCenter(new T.Vector3());
const normalization = new T.Matrix4().makeScale(2.3 / size.y, 2.3 / size.y, 2.3 / size.y)
  .multiply(new T.Matrix4().makeTranslation(-center.x, -bounds.min.y, -center.z));
const buckets = {};
source.traverse(mesh => {
  if (!mesh.isMesh) return;
  const part = mesh.name.split('_')[0];
  const geometry = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld).applyMatrix4(normalization);
  // The supplied model has no textures. Keep shape and normals; discard unused UV channels.
  for (const key of Object.keys(geometry.attributes)) if (!['position', 'normal'].includes(key)) geometry.deleteAttribute(key);
  (buckets[part] ??= []).push(geometry);
});
const model = new T.Group(); model.name = 'Enceladus';
const torso = new T.Group(); torso.name = 'AstroTorso'; model.add(torso);
function clusterGeometry(input, cell = .006) {
  const positions = input.attributes.position, normals = input.attributes.normal;
  const cells = new Map(), remap = new Uint32Array(positions.count), vertices = [];
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
    const key = `${Math.round(x / cell)},${Math.round(y / cell)},${Math.round(z / cell)}`;
    let cellIndex = cells.get(key);
    if (cellIndex === undefined) { cellIndex = vertices.length; cells.set(key, cellIndex); vertices.push([0, 0, 0, 0, 0, 0, 0]); }
    const v = vertices[cellIndex]; v[0] += x; v[1] += y; v[2] += z;
    v[3] += normals.getX(i); v[4] += normals.getY(i); v[5] += normals.getZ(i); v[6]++;
    remap[i] = cellIndex;
  }
  const outP = [], outN = [], triangles = [], seen = new Set();
  for (const v of vertices) { outP.push(v[0] / v[6], v[1] / v[6], v[2] / v[6]);
    const length = Math.hypot(v[3], v[4], v[5]) || 1; outN.push(v[3] / length, v[4] / length, v[5] / length); }
  const index = input.index.array;
  for (let i = 0; i < index.length; i += 3) {
    const a = remap[index[i]], b = remap[index[i + 1]], c = remap[index[i + 2]];
    if (a === b || a === c || b === c) continue;
    const key = [a, b, c].sort((x, y) => x - y).join(',');
    if (seen.has(key)) continue; seen.add(key); triangles.push(a, b, c);
  }
  const output = new T.BufferGeometry();
  output.setAttribute('position', new T.Float32BufferAttribute(outP, 3));
  output.setAttribute('normal', new T.Float32BufferAttribute(outN, 3));
  output.setIndex(triangles); input.dispose(); return output;
}
function subsetGeometry(input, triangles) {
  const map = new Map(), p = [], n = [], indices = [];
  for (const old of triangles) {
    if (!map.has(old)) {
      map.set(old,map.size);
      p.push(input.attributes.position.getX(old), input.attributes.position.getY(old), input.attributes.position.getZ(old));
      n.push(input.attributes.normal.getX(old), input.attributes.normal.getY(old), input.attributes.normal.getZ(old));
    }
    indices.push(map.get(old));
  }
  const g = new T.BufferGeometry(); g.setAttribute('position',new T.Float32BufferAttribute(p,3));
  g.setAttribute('normal',new T.Float32BufferAttribute(n,3)); g.setIndex(indices); return g;
}
let vertices = 0;
for (const [name, geometries] of Object.entries(buckets)) {
  const merged = mergeGeometries(geometries);
  const geometry = clusterGeometry(mergeVertices(merged, .00004));
  geometries.forEach(g => g.dispose()); merged.dispose();
  vertices += geometry.attributes.position.count;
  geometry.computeBoundingBox();
  const b = geometry.boundingBox;
  const c = b.getCenter(new T.Vector3());
  const pivot = new T.Group(); pivot.name = `Astro${name}`;
  pivot.position.set(c.x, name.startsWith('Leg') ? b.max.y - .08 : name.startsWith('Arm') ? b.max.y - .17 : c.y, c.z);
  torso.add(pivot);
  const material = new T.MeshStandardMaterial({
    color: name === 'Head' ? 0x5b9cbd : name.startsWith('Shoulder') ? 0x85b9cf : 0xdce7ed,
    metalness: name === 'Head' ? .7 : .35, roughness: name === 'Head' ? .2 : .48
  });
  material.name = `Enceladus_${name}`;
  if (name.startsWith('Leg') || name.startsWith('Arm')) {
    const split = name.startsWith('Leg') ? .76 : 1.58;
    const upper = [], lower = [], index = geometry.index.array, pos = geometry.attributes.position;
    for (let i=0;i<index.length;i+=3) {
      const target = (pos.getY(index[i])+pos.getY(index[i+1])+pos.getY(index[i+2]))/3 < split ? lower : upper;
      target.push(index[i],index[i+1],index[i+2]);
    }
    const upperGeometry = subsetGeometry(geometry,upper), lowerGeometry = subsetGeometry(geometry,lower);
    upperGeometry.translate(-pivot.position.x,-pivot.position.y,-pivot.position.z);
    lowerGeometry.translate(-pivot.position.x,-split,-pivot.position.z);
    const lowerPivot = new T.Group(); lowerPivot.name = `Astro${name}Lower`;
    lowerPivot.position.set(0,split-pivot.position.y,0); pivot.add(lowerPivot);
    const upperMesh = new T.Mesh(upperGeometry,material), lowerMesh = new T.Mesh(lowerGeometry,material);
    upperMesh.name = `${name}Mesh`; lowerMesh.name = `${name}LowerMesh`;
    pivot.add(upperMesh); lowerPivot.add(lowerMesh); geometry.dispose();
  } else {
    geometry.translate(-pivot.position.x,-pivot.position.y,-pivot.position.z);
    const mesh = new T.Mesh(geometry, material); mesh.name = `${name}Mesh`; pivot.add(mesh);
  }
}
// The file's face/feet point toward +Z. Both players face -Z in the game.
model.rotation.y = Math.PI;
const exporter = new GLTFExporter();
const binary = await exporter.parseAsync(model, { binary: true });
await fs.writeFile('public/models/astronaut/Enceladus.glb', Buffer.from(binary));
console.log(JSON.stringify({sourceClips: source.animations.map(c => c.name), bones: 0,
  parts: Object.keys(buckets), vertices, bytes: binary.byteLength}, null, 2));
