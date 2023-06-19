 import './global.js'
//  import Hydra from 'hydra-synth';
//  import * as Tone from 'tone';



 
 // Get a reference to the canvas element
 const canvas = document.getElementById('hydra-canvas');
    
 // Make the canvas fullscreen
 function fullscreenCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
 }
 
 // Call the fullscreenCanvas function initially
 fullscreenCanvas();
 
 // Add an event listener to resize the canvas when the window size changes
 window.addEventListener('resize', fullscreenCanvas);

 const synth = new Tone.PolySynth(Tone.Synth, {
  volume: -10,
  envelope: {
    attack: 6,
    decay: 0.1,
    sustain: 0.1,
    release: 1,
  },
}).toDestination();

const reverb = new Tone.Reverb({
  decay: 8,
  preDelay: 0.01,
}).toDestination();

synth.connect(reverb);

const scale = ['A3', 'C3', 'D3', 'E3', 'G3', 'A4', 'C4', 'D4', 'E4', 'G5', 'A5', 'C5', 'D5', 'E1', 'G2'];

function generateNote() {
  return scale[Math.floor(Math.random() * scale.length)];
}

Tone.Transport.scheduleRepeat((time) => {
  const note = generateNote();
  const duration = Math.random() * (12 - 8) + 8;
  const velocity = Math.random() * 0.5; // Random velocity between 0 and 1

  synth.triggerAttackRelease(note, duration, time, velocity);

  Tone.Draw.schedule(() => {
    const hue = Math.random() * 128 // Random hue between 0 and 360
    const color = `hsl(${hue}, 100%, 50%)`;

    document.body.style.backgroundColor = color; // Update background color
  }, time);
}, '4n');

Tone.Transport.start();

document.addEventListener('DOMContentLoaded', (event) => {
    startHydra();
});


function startHydra() {
  const hydra = new Hydra();

  // Create a mapping texture for colors
  const colorMap = gradient(360)
    .rotate(0.25)
    .repeat(2, 1)
    .brightness(() => Math.random() * 0.5 + 0.5)
    .out();

  // Create a mapping texture for velocity
  const velocityMap = shape(4)
    .repeat(2, 1)
    .rotate(0.1)
    .scale(() => Math.random() * 2 + 1)
    .modulate(osc(0.2))
    .out();

  // Use the mapping textures to vary colors and velocity
  osc(256, 0.1, 0.8)
    .color(() => colorMap)
    .rotate(0.8)
    .kaleid(5) 
    .modulate(
      osc(2, 0.25, 0.2).rotate(0.1, 0.9),
      () => velocityMap
    )
    .out();
}
