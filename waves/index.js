// https://twitter.com/beesandbombs/status/938448803698495488
const SIZE = 500;
const CIRCLE_DIAMETER = SIZE - 100;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
const MAX_WAVINESS = 20;

const lines = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(SIZE, SIZE);

  const circleCenter = createVector(0, 0);

  const yStep = 10;
  const startY = -CIRCLE_RADIUS + yStep;
  const endY = CIRCLE_RADIUS - yStep;

  for (let y of range(startY, endY, yStep)) {
    const [startX, endX] = computeCircleSegment(circleCenter, CIRCLE_RADIUS, y);
    const waviness = ceil(map(y, startY, endY, -MAX_WAVINESS, MAX_WAVINESS));
    const maxAmplitude = 8;
    const direction = y < 0 ? -1 : 1;
    lines.push(
      new WaveLine({ startX, endX, y, direction, maxAmplitude, waviness })
    );
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  translate(SIZE / 2, SIZE / 2);
  background(50);

  // Circle
  stroke(255);
  noFill();
  ellipse(0, 0, CIRCLE_DIAMETER);

  for (let line of lines) {
    line.update();
    line.draw();
  }
}

class WaveLine {
  constructor({
    startX,
    endX,
    y,
    direction = 1,
    maxAmplitude = 10,
    amplitudeStep = 0.3,
    waviness = 1,
  }) {
    this.startX = startX;
    this.endX = endX;
    this.y = y;
    this.amplitudeStep = amplitudeStep;
    this.maxAmplitude = maxAmplitude;
    this.waviness = waviness;
    this.direction = direction > 0 ? 1 : -1;

    this.amplitude = 0;
    this.lineStep = round(map(abs(waviness), 1, MAX_WAVINESS, 8, 2));
    this.color = "#fff";
  }
  update() {
    if (this.amplitude > this.maxAmplitude) {
      this.amplitudeStep = -this.amplitudeStep;
    } else if (this.amplitude < 0) {
      this.amplitudeStep = -this.amplitudeStep;
      this.direction = -this.direction;
    }
    this.amplitude += this.amplitudeStep;
  }

  draw() {
    stroke(this.color);
    beginShape();
    for (let x of range(this.startX, this.endX, this.lineStep)) {
      const mappedX = map(x, this.startX, this.endX, -HALF_PI, HALF_PI);
      const waveY = this.direction * wave(mappedX, this.waviness);
      const y = this.y + map(waveY, -1, 1, -this.amplitude, this.amplitude);
      vertex(x, y);
    }
    vertex(this.endX, this.y);
    endShape();
  }
}

// http://www.ambrsoft.com/TrigoCalc/Circles2/circlrLine_.htm
// http://www.mathwarehouse.com/geometry/circle/equation-of-a-circle.php
function computeCircleSegment(center, radius, y) {
  const x1 = center.x - sqrt(radius ** 2 - (center.y - y) ** 2);
  const x2 = center.x + sqrt(radius ** 2 - (center.y - y) ** 2);

  return [x1, x2];
}

function wave(x, frequency = 50) {
  return Math.exp(-(x ** 2)) * cos(frequency * x);
}

function* range(min, max, step = 1) {
  for (let i = min; i <= max; i += step) {
    yield i;
  }
}
