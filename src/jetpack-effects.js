import * as T from 'three';

export function createJetpackEffects(playerRoot, engineParent) {
  const rings = new T.Group(); playerRoot.add(rings);
  const ringGeometry = new T.TorusGeometry(.84, .025, 8, 56);
  const ringMaterial = new T.MeshBasicMaterial({color:0xc8f5ff, transparent:true, opacity:0,
    blending:T.AdditiveBlending, depthWrite:false});
  for (let i = 0; i < 3; i++) {
    const ring = new T.Mesh(ringGeometry, ringMaterial); ring.rotation.x = Math.PI / 2;
    ring.position.y = .35 + i * .75; rings.add(ring);
  }
  const positions = new Float32Array(120 * 3);
  const geometry = new T.BufferGeometry(); geometry.setAttribute('position', new T.BufferAttribute(positions, 3));
  const particleMaterial = new T.PointsMaterial({color:0xa4eaff, size:.075, transparent:true,
    blending:T.AdditiveBlending, depthWrite:false});
  const particles = new T.Points(geometry, particleMaterial); particles.frustumCulled = false; playerRoot.add(particles);
  const engine = new T.Group(); engine.position.set(0, 1.3, .38); engineParent.add(engine);
  const casingGeometry = new T.CylinderGeometry(.12, .14, .35, 12);
  const casingMaterial = new T.MeshStandardMaterial({color:0x3d627a,metalness:.65,roughness:.35});
  const flameGeometry = new T.ConeGeometry(.13, .9, 12);
  const flameMaterial = new T.MeshBasicMaterial({color:0x8cecff, transparent:true,
    blending:T.AdditiveBlending, depthWrite:false});
  const flames = [];
  for (const side of [-1, 1]) {
    const casing = new T.Mesh(casingGeometry,casingMaterial); casing.position.x = side * .22; engine.add(casing);
    const flame = new T.Mesh(flameGeometry,flameMaterial); flame.rotation.x = Math.PI;
    flame.position.set(side * .22,-.6,0); engine.add(flame); flames.push(flame);
  }
  const light = new T.PointLight(0x83dfff,0,5); light.position.y = 1; playerRoot.add(light);
  let time = 0;
  const jetMatrix = new T.Matrix4(), particlePosition = new T.Vector3();
  function update(dt, energy, thrust) {
    time += dt; rings.visible = energy > .001; engine.visible = thrust > .001;
    ringMaterial.opacity = energy * .9; flameMaterial.opacity = thrust * .85;
    rings.rotation.y = time * 3;
    rings.children.forEach((ring,i) => {
      ring.rotation.z = time * (i % 2 ? -2 : 2);
      ring.position.y = .25 + ((time * 1.5 + i * .73) % 2.3);
      ring.scale.setScalar(1 + Math.sin(time * 7 + i) * .1);
    });
    flames.forEach((flame,i) => flame.scale.set(1, Math.max(.01,thrust * (.8 + Math.sin(time * 39 + i) * .15)),1));
    particles.visible = energy + thrust > .001;
    playerRoot.updateWorldMatrix(true,false); engine.updateWorldMatrix(true,false);
    jetMatrix.copy(playerRoot.matrixWorld).invert().multiply(engine.matrixWorld);
    for (let i = 0; i < 120; i++) {
      const t = (time * (i < 72 ? .8 : 2) + i * .6180339) % 1;
      const angle = i * 2.39996 + time * 2;
      if (i < 72 && energy > .001) {
        const radius = .6 + t * .65;
        positions[i*3] = Math.cos(angle) * radius;
        positions[i*3+1] = t * 2.7;
        positions[i*3+2] = Math.sin(angle) * radius;
      } else if (i >= 72 && thrust > .001) {
        particlePosition.set((i % 2 ? -.22 : .22) + Math.sin(angle) * t * .2,
          -.2 - t * 2 * thrust, t * .65).applyMatrix4(jetMatrix).toArray(positions,i*3);
      } else { positions[i*3+1] = -1000; }
    }
    geometry.attributes.position.needsUpdate = true;
    particleMaterial.opacity = Math.min(1,energy + thrust); light.intensity = energy * 3 + thrust * 1.3;
  }
  update(0,0,0);
  return { update, reset() { time = 0; update(0,0,0); }, dispose() {
    rings.removeFromParent(); particles.removeFromParent(); engine.removeFromParent(); light.removeFromParent();
    for (const item of [ringGeometry,ringMaterial,geometry,particleMaterial,casingGeometry,casingMaterial,flameGeometry,flameMaterial]) item.dispose();
  } };
}
