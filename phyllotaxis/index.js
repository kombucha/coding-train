// https://en.wikipedia.org/wiki/Phyllotaxis
// http://algorithmicbotany.org/papers/abop/abop-ch4.pdf

const width = 800;
const height = 800;

const MAX_N = 800;
const alpha = 137.5;
let MAX_R_APPROX;
const C_GROWING_FACTOR = 0.01;
const ELLIPSE_SIZE_GROWING_FACTOR = 0.02;
let c = 3;
let ellipseSize = 2;

function setup() {
  MAX_R_APPROX = (c + MAX_N * 0.01) * sqrt(MAX_N);
  createCanvas(width, height);
  background(50);
  angleMode(DEGREES);
  colorMode(HSB);
}

let n = 0;
function draw() {
  const theta = n * alpha;
  const r = c * sqrt(n);
  const x = r * cos(theta);
  const y = r * sin(theta);

  translate(width / 2, height / 2);
  noStroke();
  fill(255 - r / MAX_R_APPROX * 255, 255, 255);
  ellipse(x, y, ellipseSize, ellipseSize);

  c += C_GROWING_FACTOR;
  ellipseSize += ELLIPSE_SIZE_GROWING_FACTOR;
  n++;
  if (n > MAX_N) {
    noLoop();
  }
}
