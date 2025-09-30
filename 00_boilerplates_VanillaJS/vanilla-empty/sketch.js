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
  console.log("draw canvas");
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "black";

  const numCircles = 10;
  const columnWidth = width / numCircles;
  for (let i = 0; i < numCircles; i++) {
    const positionX = columnWidth * i + columnWidth / 2;
    ctx.arc(positionX, height / 2, columnWidth / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}
