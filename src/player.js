import { createAvatar, avatarInfo } from './avatar.js';
import { createAstronaut, astronautInfo } from './astronaut.js';
import { JetpackFlight } from './jetpack-flight.js';
import { createJetpackEffects } from './jetpack-effects.js';
import { createDissolve } from './dissolve.js';

export { avatarInfo, astronautInfo };

export function createPlayer(onError, colors) {
  const base = createAvatar(onError, colors), astronaut = createAstronaut();
  const flight = new JetpackFlight();
  const playerRoot = base.g; playerRoot.name = 'playerRoot'; playerRoot.add(astronaut.g);
  const effects = createJetpackEffects(playerRoot, astronaut.pivot);
  let baseFade, astronautFade, disposed = false;
  const ready = Promise.all([base.ready, astronaut.ready]).then(() => {
    if (disposed) return;
    baseFade = createDissolve(base.body);
    if (astronaut.model) astronautFade = createDissolve(astronaut.model);
    astronaut.g.visible = false;
  });
  function update(dt, input) {
    // The flight controller owns timing/height, main owns the single playerRoot coordinates.
    const available = !!astronaut.model;
    const alpha = available ? flight.alpha : 0;
    const mode = flight.state === 'landing' ? 'run'
      : flight.state === 'transformingBack' ? 'jump'
      : flight.active ? 'fly' : input.mode;
    base.update(dt,{...input, mode, grounded:flight.state === 'landing' || (!flight.active && input.grounded)});
    if (alpha > .001) astronaut.update(dt,{...input,thrust:flight.thrust});
    baseFade?.set(1-alpha); astronautFade?.set(alpha); astronaut.g.visible = alpha > .001;
    // If the astronaut failed, the same engine follows the original avatar instead.
    if (astronautInfo.status === 'error' && astronaut.pivot.parent !== base.body) base.body.add(astronaut.pivot);
    effects.update(dt,flight.energy,flight.thrust);
  }
  function reset() {
    flight.reset(); effects.reset(); baseFade?.set(1); astronautFade?.set(0); astronaut.g.visible = false;
  }
  return { ...base, g:playerRoot, flight, ready, update, reset, dispose() {
    disposed = true; reset(); effects.dispose(); baseFade?.dispose(); astronautFade?.dispose();
    astronaut.dispose(); base.dispose();
  } };
}
