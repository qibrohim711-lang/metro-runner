import * as T from 'three';

// The FBX contains a rig, but no animation clips. Bake real bone tracks once,
// keeping all mesh and skeleton scales unchanged during gameplay.
export function buildAvatarAnimations(root) {
  root.updateWorldMatrix(true, true);
  const rest = [];
  const rootRotation = root.getWorldQuaternion(new T.Quaternion());
  root.traverse(bone => {
    if (!bone.isBone || bone.position.lengthSq() < 1e-8) return;
    if (!/^(Left|Right)(Arm|ForeArm|UpLeg|Leg|Foot)$|^Spine[012]?$|^Neck$|^Head$/.test(bone.name)) return;
    rest.push({ bone, q: bone.quaternion.clone(), side: bone.name.startsWith('Left') ? 1 : -1 });
  });
  const definitions = { idle: 2.4, run: .68, takeoff: .11, jump: .9, fly: 1.8, roll: .8, land: .24 };
  const clips = {};
  for (const [mode, duration] of Object.entries(definitions)) {
    const frames = Math.ceil(duration * 30), tracks = [], times = [];
    const samples = rest.map(() => []);
    for (let frame = 0; frame <= frames; frame++) {
      const t = frame / frames;
      times.push(t * duration);
      for (const joint of rest) joint.bone.quaternion.copy(joint.q);
      root.updateWorldMatrix(true, true);
      for (let i = 0; i < rest.length; i++) {
        const joint = rest[i];
        // The elbow/knee axis must follow the posed parent, not the T-pose parent.
        const inverse = joint.bone.parent.getWorldQuaternion(new T.Quaternion()).invert();
        const axis = vector => vector.applyQuaternion(rootRotation).applyQuaternion(inverse).normalize();
        const angles = poseAngles(mode, t, joint.bone.name, joint.side);
        const q = joint.q.clone();
        q.premultiply(new T.Quaternion().setFromAxisAngle(axis(new T.Vector3(0, 0, 1)), angles.z));
        q.premultiply(new T.Quaternion().setFromAxisAngle(axis(new T.Vector3(1, 0, 0)), angles.x));
        joint.bone.quaternion.copy(q);
        joint.bone.updateWorldMatrix(false, true);
        samples[i].push(...q.toArray());
      }
    }
    for (let i = 0; i < rest.length; i++) {
      // UUID bindings avoid the duplicate FBX bone names (twist/helper bones).
      tracks.push(new T.QuaternionKeyframeTrack(`${rest[i].bone.uuid}.quaternion`, times, samples[i]));
    }
    clips[mode] = new T.AnimationClip(`Metro_${mode}`, duration, tracks);
  }
  for (const joint of rest) joint.bone.quaternion.copy(joint.q);
  root.updateWorldMatrix(true, true);
  return clips;
}

function poseAngles(mode, t, name, side) {
  const arm = /^(Left|Right)Arm$/.test(name);
  const forearm = name.endsWith('ForeArm');
  const thigh = name.endsWith('UpLeg');
  const knee = /^(Left|Right)Leg$/.test(name);
  const foot = name.endsWith('Foot');
  const spine = name.startsWith('Spine');
  const head = name === 'Head' || name === 'Neck';
  let x = 0, z = arm ? -side * 1.32 : 0;
  const cycle = Math.sin(t * Math.PI * 2) * side;
  if (mode === 'run') {
    if (arm) x = cycle * .72 - .12;
    if (forearm) x = -.95 + cycle * .15;
    if (thigh) x = -cycle * .8;
    if (knee) x = .12 + Math.max(0, cycle) * 1.25;
    if (foot) x = -.1 - Math.max(0, cycle) * .2;
    if (spine) x = .035;
    if (head) x = -.025;
  } else if (mode === 'jump') {
    // Anticipation -> push-off -> flight -> preparation for landing.
    const bend = t < .16 ? T.MathUtils.lerp(.25, .08, t / .16)
      : t < .55 ? T.MathUtils.lerp(.08, .85, (t - .16) / .39)
      : T.MathUtils.lerp(.85, .3, (t - .55) / .45);
    if (thigh) x = -bend * (side > 0 ? 1 : .72);
    if (knee) x = bend * 1.6;
    if (arm) x = -.45 - Math.sin(t * Math.PI) * .85 + side * .12;
    if (forearm) x = -.65 + Math.sin(t * Math.PI * 2) * .2;
    if (spine) x = .07 + Math.sin(t * Math.PI) * .04;
    if (head) x = -.08;
  } else if (mode === 'fly') {
    if (arm) { x = -.3 + cycle * .12; z += side * .24; }
    if (forearm) x = -.9 + Math.cos(t * Math.PI * 2 + side) * .15;
    if (thigh) x = .18 + cycle * .16;
    if (knee) x = .55 + Math.cos(t * Math.PI * 2 + side) * .2;
    if (foot) x = -.2;
    if (spine) x = .055 + Math.sin(t * Math.PI * 2) * .018;
    if (head) x = -.09;
  } else if (mode === 'roll') {
    // A knee slide, not a scaled somersault: folded knees, hips low,
    // torso forward, hands reaching ahead. Ease into and out of the pose.
    const enter = T.MathUtils.smoothstep(t, 0, .15);
    const exit = 1 - T.MathUtils.smoothstep(t, .78, 1);
    const tuck = enter * exit;
    if (thigh) x = -1.9 * tuck;
    if (knee) x = 2.65 * tuck;
    if (foot) x = -.55 * tuck;
    if (spine) x = .31 * tuck;
    if (head) x = -.22 * tuck;
    if (arm) { x = -.95 * tuck; z += side * .16 * tuck; }
    if (forearm) x = -.4 - .5 * tuck + Math.sin(t * Math.PI * 2) * .12 * tuck;
  } else if (mode === 'land' || mode === 'takeoff') {
    const bend = Math.sin(t * Math.PI) * .48;
    if (thigh) x = -bend;
    if (knee) x = bend * 1.8;
    if (spine) x = bend * .25;
    if (arm) x = -.25 + bend * .3;
    if (forearm) x = -.75;
  } else {
    if (arm) x = -.06 + cycle * .025;
    if (forearm) x = -.3;
    if (spine) x = Math.sin(t * Math.PI * 2) * .012;
  }
  return { x, z };
}
