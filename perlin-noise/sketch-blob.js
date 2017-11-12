const width = 500;
const height = 500;

const r = width / 4;
const circleStep = 2 * Math.PI / 120;

function setup() {
  createCanvas(width, height);
}

let perlinTime = 0;
const perlinTimeStep = 0.005;
const perlinPointStep = 0.06;
function draw() {
  translate(width / 2, height / 2);
  background(50);

  beginShape();
  noStroke();
  fill(255);
  let perlinPoint = 0;
  for (let angle = 0; angle <= 2 * PI; angle += circleStep) {
    const adjustedR = r * map(noise(perlinPoint, perlinTime), 0, 1, 0.75, 1.25);
    const x = adjustedR * cos(angle);
    const y = adjustedR * sin(angle);
    vertex(x, y);

    if (angle < PI) {
      perlinPoint += perlinPointStep;
    } else {
      perlinPoint -= perlinPointStep;
    }
  }

  endShape();
  perlinTime += perlinTimeStep;
}
