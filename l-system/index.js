// https://en.wikipedia.org/wiki/L-system

function step(str, rules) {
  let result = "";
  for (const char of str) {
    let matchedRule = false;
    for (const rule of rules) {
      if (char === rule.symbol) {
        result += rule.replacement;
        matchedRule = true;
        break;
      }
    }

    if (!matchedRule) {
      result += char;
    }
  }

  return result;
}

const binaryTreeSystem = {
  axiom: "0",
  rules: [
    { symbol: "1", replacement: "11" },
    { symbol: "0", replacement: "1[0]0" }
  ],
  draw() {
    translate(width / 2, height);
    stroke(255);

    let branchLength = 2;
    for (let char of currentSentence) {
      switch (char) {
        case "0":
        case "1":
          line(0, 0, 0, -branchLength);
          translate(0, -branchLength);
          break;
        case "[":
          push();
          rotate(-PI / 6);
          break;
        case "]":
          pop();
          rotate(PI / 6);
          break;
      }
    }
  }
};

const kochCurveSystem = {
  axiom: "F",
  rules: [{ symbol: "F", replacement: "F+F-F-F+F" }],
  draw() {
    translate(width / 2, height / 2);
    stroke(255);
    const len = 5;
    for (let char of currentSentence) {
      switch (char) {
        case "F":
          line(0, 0, len, 0);
          translate(len, 0);
          break;
        case "+":
          rotate(-PI / 2);
          break;
        case "-":
          rotate(PI / 2);
          break;
      }
    }
  }
};

const sierpinskiTriangleSystem = {
  axiom: "F-G-G",
  rules: [
    { symbol: "F", replacement: "F-G+F+G-F" },
    { symbol: "G", replacement: "GG" }
  ],
  draw() {
    translate(0, height);
    stroke(255);

    const angle = 120 * PI / 180;
    const len = 5;

    for (let char of currentSentence) {
      switch (char) {
        case "F":
        case "G":
          line(0, 0, len, 0);
          translate(len, 0);
          break;
        case "+":
          rotate(angle);
          break;
        case "-":
          rotate(-angle);
          break;
      }
    }
  }
};

const fractalPlantSystem = {
  axiom: "X",
  rules: [
    { symbol: "X", replacement: "F[-X][X]F[-X]+FX" },
    { symbol: "F", replacement: "FF" }
  ],
  draw() {
    translate(0, height / 2);
    stroke(10, 150, 0);

    const angle = 25 * PI / 180;
    const len = 5;

    for (let char of currentSentence) {
      switch (char) {
        case "F":
        case "G":
          line(0, 0, len, 0);
          translate(len, 0);
          break;
        case "+":
          rotate(angle);
          break;
        case "-":
          rotate(-angle);
          break;
        case "[":
          push();
          break;
        case "]":
          pop();
          break;
      }
    }
  }
};

// P5 stuff
const width = 400;
const height = 400;
let currentSystem;
let currentSentence;
function setup() {
  // state
  currentSystem = fractalPlantSystem;
  currentSentence = currentSystem.axiom;

  // Init p5
  createCanvas(width, height);
  noLoop();

  // Steppper
  document.getElementById("stepper").addEventListener("click", () => {
    currentSentence = step(currentSentence, currentSystem.rules);
    redraw();
  });
}

function draw() {
  background(50);
  currentSystem.draw();
}
