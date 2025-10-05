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
  // ctx.arc(100, 100, 50, 0, 2 * Math.PI);
  // ctx.fill();
  drawCircles(ctx, width, height);

  // let frameCount = 0;
  // drawAnimateCircles();

  // function drawAnimateCircles() {
  //   ctx.fillStyle = "rgba(255,255,255,0.05)";
  //   ctx.fillRect(0, 0, width, height);
  //   ctx.fillStyle = "black";

  //   const circleSize = 1;
  //   const numCirclesByRow = width / (circleSize * 10);
  //   const numCirclesByColumn = height / (circleSize * 10);
  //   const columnWidth = width / numCirclesByColumn;
  //   const columnHeight = height / numCirclesByRow;
  //   const move = { velocity: 0.01, amplitude: 100 };
  //   for (let rowPosition = 0; rowPosition < numCirclesByRow; rowPosition++) {
  //     for (
  //       let columnPosition = 0;
  //       columnPosition < numCirclesByColumn;
  //       columnPosition++
  //     ) {
  //       const movingPositionY = Math.cos(
  //         (frameCount + rowPosition * 10) * move.velocity
  //       );
  //       const positionY =
  //         columnHeight * rowPosition +
  //         columnHeight / 2 +
  //         movingPositionY * move.amplitude;

  //       const movingPositionX = Math.sin(
  //         (frameCount + columnPosition * 10) * move.velocity
  //       );
  //       const positionX =
  //         columnWidth * columnPosition +
  //         columnWidth / 2 +
  //         movingPositionX * move.amplitude;
  //       ctx.beginPath();
  //       ctx.arc(positionX, positionY, circleSize, 0, 2 * Math.PI);
  //       ctx.fill();
  //       ctx.closePath();
  //     }
  //   }

  //   frameCount++;

  //   requestAnimationFrame(drawAnimateCircles);
  // }
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
