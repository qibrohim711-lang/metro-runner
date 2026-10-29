import test from 'node:test';
import assert from 'node:assert/strict';
import { JetpackFlight } from '../src/jetpack-flight.js';

test('jetpack follows every phase with continuous height and a protected landing', () => {
  const flight = new JetpackFlight(), states = [];
  flight.collect(8,0);
  let previous = 0, hadClearance = false;
  for (let i=0;i<540;i++) {
    if(states.at(-1)!==flight.state)states.push(flight.state);
    flight.update(1/60);
    assert.ok(Math.abs(flight.height-previous)<.23,'height jumped');
    assert.ok(flight.alpha>=0&&flight.alpha<=1);
    if(flight.clearingLanding){assert.ok(flight.protected);hadClearance=true;}
    previous=flight.height;
  }
  assert.deepEqual(states,['transformingToAstronaut','flying','transformingBack','landing','running']);
  assert.ok(hadClearance); assert.equal(flight.height,0);assert.equal(flight.alpha,0);
});

test('another pickup extends flight without replaying transformation; pause freezes it', () => {
  const flight = new JetpackFlight();flight.collect();
  for(let i=0;i<60;i++)flight.update(1/60);
  const before=flight.remaining, clock=flight.clock;
  flight.collect();assert.equal(flight.state,'flying');assert.equal(flight.remaining,before+8);
  assert.equal(flight.clock,clock);assert.equal(flight.alpha,1);
  const snapshot=JSON.stringify(flight);for(let i=0;i<60;i++)flight.update(0);
  assert.equal(JSON.stringify(flight),snapshot);
  flight.reset();assert.equal(flight.active,false);assert.equal(flight.protected,false);
});

test('repeated full cycles return to the same initial model state', () => {
  const flight=new JetpackFlight();
  for(let cycle=0;cycle<6;cycle++){
    flight.collect(8,0);
    for(let i=0;i<620;i++)flight.update(1/60);
    assert.equal(flight.state,'running');assert.equal(flight.remaining,0);
    assert.equal(flight.alpha,0);assert.equal(flight.protected,false);
  }
});
