// import "./ball.js";

window.addEventListener("load", () => {
  myApp();
});

const numberCircleByLine = 2;

function myApp() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const devicePixelRatio = window.devicePixelRatio || 1;
  const ctx = canvas.getContext("2d");
  let [width, height] = setCanvasSize(canvas, ctx, devicePixelRatio);

  const circlesArray = createArrayCircle(ctx, width, height);

  let frameCount = 0;
  draw();
  function draw() {
    // Reset background
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < circlesArray.length; i++) {
      circlesArray[i].update();
      circlesArray[i].draw();
    }

    frameCount++;
    requestAnimationFrame(draw);
  }

  // Responsive
  window.addEventListener("resize", windowResizeHandler);
  window.addEventListener("click", onClickHandler);

  function windowResizeHandler() {
    [width, height] = setCanvasSize(canvas, ctx, devicePixelRatio);
    console.log("resize");
    for (let i = 0; i < circlesArray.length; i++) {
      circlesArray[i].resize(width, height);
    }
  }

  function onClickHandler(event) {
    console.log(event);
    let clickOnBall = false;
    const mx = event.clientX * devicePixelRatio;
    const my = event.clientY * devicePixelRatio;
    console.log("mouse", mx, my);

    // @TODO: fade out but remove ? (exercice)
    for (let i = 0; i < circlesArray.length; i++) {
      const [posX, posY] = circlesArray[i].getPosition();
      const radius = circlesArray[i].radius;
      if (posX >= mx - radius && posX <= mx + radius) {
        if (posY >= my - radius && posY <= my + radius) {
          circlesArray.splice(i, 1);
          clickOnBall = true;
          break;
        }
      }
    }
    if (!clickOnBall) {
      const randomRadius = map(Math.random(), 0, 1, 10, 50);
      const randomColor = map(Math.random(), 0, 1, 0, 255);
      const newBall = new Ball(ctx, width, height, mx, my, randomRadius, "red");
      // newBall.draw();
      circlesArray.push(newBall);
    }
    console.log("clickOnBall", clickOnBall);
    console.log("circlesArray", circlesArray);

    // console.log(circlesArray);
  }
}

function setCanvasSize(canvas, ctx, devicePixelRatio) {
  let width = window.innerWidth * devicePixelRatio;
  let height = window.innerHeight * devicePixelRatio;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width / devicePixelRatio + "px";
  canvas.style.height = height / devicePixelRatio + "px";

  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  return [width, height];
}

function createArrayCircle(ctx, width, height) {
  const circlesArray = [];
  const numCircles = numberCircleByLine;

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
      const circle = createCircle(ctx, width, height, positionX, positionY);

      circlesArray.push(circle);
    }
  }
  return circlesArray;
}

function createCircle(ctx, w, h, positionX, positionY) {
  const mappedRadius = map(Math.random(), 0, 1, 10, 50);
  const mappedColor = map(Math.random(), 0, 1, 0, 255);
  const circle = new Ball(
    ctx,
    w,
    h,
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
