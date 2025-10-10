function myApp() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  // Hardware of mac
  // const pixelDensity = window.devicePixelRatio;
  // const width = window.innerWidth * pixelDensity;
  // const height = window.innerHeight * pixelDensity;
  // canvas.width = width;
  // canvas.height = height;
  // canvas.style.width = width / pixelDensity + "px";
  // canvas.style.height = height / pixelDensity + "px";

  window.addEventListener("resize", () => {
    drawCanvas(canvas);
  });

  drawCanvas(canvas);
}

window.addEventListener("load", () => {
  myApp();
});

function drawCanvas(canvas) {
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // 1 circle
  // ctx.fillStyle = "white";
  // drawCircle(ctx, 100, 100, 50);
  // Grid of circles
  // drawCircles(ctx, width, height);

  let frameCount = 0;
  ctx.fillStyle = "white";
  drawAnimateCircles();
  function drawAnimateCircles() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";

    const circleSize = 10;
    const numCircles = 3;
    const columnWidth = width / numCircles;
    const columnHeight = height / numCircles;
    const move = { velocity: 0.01, amplitude: 100 };
    for (let rowPosition = 0; rowPosition < 10; rowPosition++) {
      for (
        let columnPosition = 0;
        columnPosition < numCircles;
        columnPosition = columnPosition + 1
      ) {
        // const randomizeStart = frameCount + columnPosition * 100; // align start on column
        const randomizeStart =
          frameCount + columnPosition * 100 + rowPosition * 100;

        // const movingPositionX = Math.sin(frameCount * move.velocity);
        const movingPositionX = Math.sin(randomizeStart * move.velocity); // This version is used to randomize start of the circles, need to be used also in moving PositionY
        const positionX =
          columnWidth * columnPosition + // position on the grid
          columnWidth / 2 + // center of the column
          movingPositionX * move.amplitude; // x position trigo * by number of pixels

        // const movingPositionY = Math.cos(frameCount * move.velocity);
        const movingPositionY = Math.cos(randomizeStart * move.velocity);
        const positionY =
          columnHeight * rowPosition +
          columnHeight / 2 +
          movingPositionY * move.amplitude;

        ctx.beginPath();
        ctx.arc(positionX, positionY, circleSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    frameCount++;

    requestAnimationFrame(drawAnimateCircles); // No () or error of stack overflow
  }
}

function drawCircle(ctx, positionX, positionY, radius) {
  ctx.beginPath();
  // arc(x, y, radius, startAngle, endAngle, counterclockwise)
  ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

function drawCircles(ctx, width, height) {
  ctx.fillStyle = "white";
  const numCircles = 10;
  const columnWidth = width / numCircles;
  const lineHeight = height / numCircles;
  for (let i = 0; i < numCircles; i++) {
    const positionX = columnWidth * i + columnWidth / 2;
    for (let j = 0; j < numCircles; j++) {
      const positionY = lineHeight * j + lineHeight / 2;
      drawCircle(ctx, positionX, positionY, columnWidth / 4);
    }
  }
}
