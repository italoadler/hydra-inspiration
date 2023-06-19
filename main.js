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

// Create the Tone.js synth and connect it
const synth = new Tone.PolySynth(Tone.Synth, {
  polyphony: 8, // Maximum number of simultaneous voices
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

const scale = ['C3', 'D3', 'E3', 'G3', 'A4', 'C4', 'D4', 'E4', 'G5', 'A5', 'C5', 'D5'];

function chooseRandomScaleNote() {
  return scale[Math.floor(Math.random() * scale.length)];
}

const bpm = 120;

function generateRandomSleep() {
  return Math.random() * 0.25 + 0.25;
}

let frequency = 4;

function updateFrequency() {
  // Increase the frequency value
  frequency += 1;

  // Limit the frequency value to a maximum of 32
  if (frequency > 32) {
    frequency = 32;
  }

  // Update the oscillator frequency
  osc(frequency, 0.1, 0.8)
    .color(() => colorMap)
    .rotate(0.8)
    .kaleid(5)
    .modulate(
      osc(2, 0.25, 0.2).rotate(0.1, 0.9),
      () => velocityMap
    )
    .out();

  // Continue updating the frequency until it reaches the maximum value
  if (frequency < 32) {
    setTimeout(updateFrequency, 1000); // Delay for 1 second before the next update
  }
}

function playEno() {
  const note = chooseRandomScaleNote();
  const attack = 0.015;
  const release = Math.random() * 6 + 2;

  synth.triggerAttackRelease(note, release, Tone.now(), attack);
  setTimeout(playEno, generateRandomSleep() * (60 / bpm) * 1000);
}

document.addEventListener('click', () => {
  if (Tone.context.state !== 'running') {
    Tone.start();
  }
  playEno();
  updateFrequency(); // Start the frequency update process
});

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
  osc(frequency, 0.1, 0.8)
    .color(() => colorMap)
    .rotate(0.8)
    .kaleid(5)
    .modulate(
      osc(2, 0.25, 0.2).rotate(0.1, 0.9),
      () => velocityMap
    )
    .out();
}
