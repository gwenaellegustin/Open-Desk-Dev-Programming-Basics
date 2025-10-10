// import "./ball.js";

window.addEventListener("load", () => {
  myApp();
});

function myApp() {
  const [ctx, width, height] = setCanvas();

  let frameCount = 0;

  let circlesArray = createArrayCircle(ctx, width, height);

  draw();
  function draw() {
    // Reset background
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 100; i++) {
      circlesArray[i].update();
      circlesArray[i].draw();
    }

    frameCount++;
    requestAnimationFrame(draw);
  }
}

function setCanvas() {
  const myCanvas = document.createElement("canvas");
  document.body.appendChild(myCanvas);

  // Size
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ctx = myCanvas.getContext("2d");
  myCanvas.width = width;
  myCanvas.height = height;
  myCanvas.style.width = width + "px";
  myCanvas.style.height = height + "px";

  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  return [ctx, width, height];
}

function createArrayCircle(context, width, height) {
  const circlesArray = [];
  const numCircles = 10;

  const columnWidth = width / numCircles;
  const columnHeight = height / numCircles;

  for (let rowPosition = 0; rowPosition < numCircles; rowPosition++) {
    for (
      let columnPosition = 0;
      columnPosition < numCircles;
      columnPosition = columnPosition + 1
    ) {
      const positionY = columnHeight * rowPosition + columnHeight / 2;
      const positionX = columnWidth * columnPosition + columnWidth / 2;
      const circle = createCircle(context, positionX, positionY);

      circlesArray.push(circle);
    }
  }
  return circlesArray;
}

function createCircle(context, positionX, positionY) {
  const mappedRadius = map(Math.random(), 0, 1, 10, 50);
  const mappedColor = map(Math.random(), 0, 1, 0, 255);
  console.log(mappedColor);
  const circle = new Ball(
    context,
    positionX,
    positionY,
    mappedRadius,
    "rgb(0,0," + mappedColor + ")"
  );
  return circle;
}

function map(num, start1, stop1, start2, stop2) {
  return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
