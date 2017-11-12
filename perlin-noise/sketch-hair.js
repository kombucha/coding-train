// P5 stuff
const width = 800;
const height = 800;
const step = 20;
const colNb = Math.floor(width / step);
const rowNb = Math.floor(height / step);
let frameRateIndicator;

// State
const maxParticles = 300;
const particles = [];
const forceField = [];

function setup() {
  createCanvas(width, height);
  frameRate(60);
  // noLoop();
  background(50);

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle(random(0, width), random(0, height)));
  }

  frameRateIndicator = createP("");
}

let noiseZ = 0; // time
const noiseStep = 0.05;
const timeStep = 0.0015;
function updateForceField() {
  let noiseX = 0; // y
  let noiseY = 0; // x
  for (let y = 0; y < rowNb; y++) {
    for (let x = 0; x < colNb; x++) {
      const noiseValue = noise(noiseX, noiseY, noiseZ);
      const angle = map(noiseValue, 0, 1, -2 * PI, 2 * PI);
      const forceVector = p5.Vector.fromAngle(angle);
      forceVector.mult(step);

      const index = x + y * colNb;
      forceField[index] = forceVector;

      noiseX += noiseStep;
    }
    noiseX = 0;
    noiseY += noiseStep;
  }

  noiseZ += timeStep;
}

function drawForceField() {
  stroke(255);
  for (let y = 0; y < rowNb; y++) {
    for (let x = 0; x < colNb; x++) {
      const index = x + y * colNb;
      const forceVector = forceField[index];

      push();
      translate(x * step, y * step);
      line(0, 0, forceVector.x, forceVector.y);
      pop();
    }
  }
}

function updateParticles() {
  for (const particle of particles) {
    // Apply force
    const x = constrain(floor(particle.position.x / step), 0, colNb - 1);
    const y = constrain(floor(particle.position.y / step), 0, rowNb - 1);
    const index = x + y * colNb;
    const forceVector = forceField[index];

    if (forceVector) {
      particle.applyForce(forceVector);
    }

    // Update particle
    particle.update();
  }
}

function drawParticles() {
  for (const particle of particles) {
    particle.draw();
  }
}

function draw() {
  // Updates
  updateForceField();
  updateParticles();

  // Reset
  // background(50);
  // drawForceField();

  drawParticles();

  // Draw framerate
  frameRateIndicator.html(round(frameRate()));
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.speed = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.limit = random(2, 4);
    this.color = color(
      random(0, 255),
      random(0, 255),
      random(0, 255),
      random(25, 50)
    );
  }

  applyForce(force) {
    this.acceleration.set(force);
  }

  update() {
    // Update speed
    this.speed.add(this.acceleration);
    this.speed.limit(this.limit);

    // Update position
    this.position.add(this.speed);

    // Wrap around
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;

    // Reset force
    this.acceleration.set(0, 0);
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, Particle.SIZE, Particle.SIZE);
  }
}
Particle.SIZE = 4;
