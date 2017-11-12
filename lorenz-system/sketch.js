// https://en.wikipedia.org/wiki/Lorenz_system

const width = 800;
const height = 800;

function setup() {
  createCanvas(width, height, WEBGL);
  colorMode(HSB);
}

const points = [];
let x = 0.01;
let y = 0;
let z = 0;

const dt = 0.01;
const a = 10;
const b = 28;
const c = 8 / 3;
let color = 50;

function draw() {
  const dx = a * (y - x);
  const dy = x * (b - z) - y;
  const dz = x * y - c * z;

  x += dt * dx;
  y += dt * dy;
  z += dt * dz;

  points.push(createVector(x, y, z));

  // translate(width / 2, height / 2);
  background(0, 0, 20);
  scale(6);

  noFill();
  beginShape(LINES);
  stroke(50, 255, 255);
  for (const p of points) {
    vertex(p.x, p.y, p.z);
  }
  endShape();
}
