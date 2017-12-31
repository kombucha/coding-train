// https://beesandbombs.tumblr.com/post/165973828124/beesandbombs-descending-from-the-archive
const SIZE = 400;
const CIRCLE_DIAMETER = SIZE - 100;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
const CIRCLES_RADIUS = 16;

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(SIZE, SIZE);
}

let offset = 0;
// eslint-disable-next-line no-unused-vars
function draw() {
  translate(SIZE / 2, SIZE / 2);
  background(50);

  noStroke();
  for (let t of range(0, TWO_PI, TWO_PI / 20)) {
    const x = CIRCLE_RADIUS * cos(t);
    const y = CIRCLE_RADIUS * sin(t);
    ellipse(x, y, CIRCLES_RADIUS * sin(-t / 2 + offset));
  }

  offset = (offset + 0.05) % TWO_PI;
}

function* range(min, max, step = 1) {
  for (let i = min; i <= max; i += step) {
    yield i;
  }
}
