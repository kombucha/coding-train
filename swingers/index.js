// https://beesandbombs.tumblr.com/post/167948476284/swingers
const SIZE = 400;
const swingers = [];

// eslint-disable-next-line no-unused-vars
function setup() {
  createCanvas(SIZE, SIZE);

  const numberOfSwingers = 12;
  const swingerGap = 16;
  const swingerSize = SIZE / numberOfSwingers;
  const colors = [color("#ef8c82"), color("#97c6a5")];
  const maxDist = sqrt(2 * (numberOfSwingers / 2) ** 2);

  for (let y of range(0, numberOfSwingers)) {
    const yOffset = (swingerSize / 2 + swingerGap) * y;
    for (let x of range(0, numberOfSwingers)) {
      const xOffset =
        y % 2 === 0
          ? (swingerSize + swingerGap) * x
          : (swingerSize + swingerGap) * (x + 0.5);
      // const step = map(
      //   dist(numberOfSwingers / 2, numberOfSwingers / 2, x, y),
      //   0,
      //   maxDist,
      //   0.1,
      //   0.08
      // );
      const step = 0.08;
      swingers.push(
        new Swinger({
          step,
          colors,
          position: createVector(xOffset, yOffset),
          size: swingerSize,
        })
      );
    }
  }
}

// eslint-disable-next-line no-unused-vars
function draw() {
  background(50);

  for (let swinger of swingers) {
    swinger.update();
    swinger.draw();
  }
}

class Swinger {
  constructor({ position, size, step = 0.08, colors = ["#f00", "#0f0"] }) {
    // params
    this.position = position;
    this.size = size;
    this.colors = colors;
    this.step = step;
    this.ballSize = 10;

    // state
    this.color = colors[0];
    this.offset = 0;
  }

  update() {
    this.offset = this.offset + this.step;
    if (this.offset <= 0 || this.offset >= PI) {
      this.step = -this.step;
    }
    const amount = this.offset / PI;
    // Lerping costs a lot. Either memoize or just use like 10 colors
    this.color = lerpColor(this.colors[0], this.colors[1], amount);
  }

  draw() {
    stroke("#fff");
    noFill();
    arc(this.position.x, this.position.y, this.size, this.size, 0, -PI);

    fill(this.color);
    noStroke();
    const x = this.position.x + this.size / 2 * cos(this.offset);
    const y = this.position.y + this.size / 2 * sin(this.offset);
    ellipse(x, y, this.ballSize);
  }
}

function* range(min, max, step = 1) {
  for (let i = min; i <= max; i += step) {
    yield i;
  }
}
