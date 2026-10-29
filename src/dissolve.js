// Screen-space dither works with opaque FBX/glTF materials, including skinning.
// It avoids transparent sorting errors between overlapping character meshes.
export function createDissolve(root) {
  const opacity = { value: 1 }, clones = new Map(), meshes = [];
  root.traverse(mesh => {
    if (!mesh.isMesh) return;
    const replace = original => {
      if (clones.has(original)) return clones.get(original);
      const material = original.clone();
      material.onBeforeCompile = shader => {
        shader.uniforms.uMetroOpacity = opacity;
        shader.fragmentShader = 'uniform float uMetroOpacity;\n' + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_fragment>', `
          #include <alphatest_fragment>
          float metroNoise = fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898,78.233))) * 43758.5453);
          if (metroNoise >= uMetroOpacity) discard;
        `);
      };
      material.customProgramCacheKey = () => 'metro-transform-dither-v1';
      clones.set(original, material); return material;
    };
    meshes.push({ mesh, original: mesh.material, shadow: mesh.castShadow });
    mesh.material = Array.isArray(mesh.material) ? mesh.material.map(replace) : replace(mesh.material);
  });
  return {
    set(value) { opacity.value = Math.max(0, Math.min(1, value)); root.visible = value > .001;
      for (const item of meshes) item.mesh.castShadow = item.shadow && value > .5; },
    dispose() { for (const item of meshes) { item.mesh.material = item.original; item.mesh.castShadow = item.shadow; }
      clones.forEach(material => material.dispose()); root.visible = true; }
  };
}
