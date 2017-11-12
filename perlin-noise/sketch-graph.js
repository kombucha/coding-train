// P5 stuff
const width = 400;
const height = 400;
const step = 5;
let frameRateIndicator;

function setup() {
  // Init p5
  createCanvas(width, height);
  frameRate(30);
  frameRateIndicator = createP("");
}

let startOffset = 0;
let walkStep = 0.01;

function draw() {
  translate(0, height / 2);
  background(50);
  fill(255);

  let xOffset = startOffset;
  let y;
  for (let x = 0; x < width; x += step) {
    y = map(cos(xOffset) + noise(xOffset), -1, 2, -height / 2, height / 2);

    ellipse(x, y, 4, 4);
    xOffset += walkStep;
  }

  startOffset += walkStep;
  frameRateIndicator.html(round(frameRate()));
}
