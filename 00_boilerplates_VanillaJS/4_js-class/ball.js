class Ball {
  constructor(ctx, width, height, x, y, radius, color) {
    this.context = ctx;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.setVelocity(2, -2);
  }

  setVelocity(min, max) {
    this.velocity = {
      x: Math.random() * (max - min) + min,
      y: Math.random() * (max - min) + min,
    };
  }

  draw() {
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x > this.width - this.radius || this.x < this.radius) {
      this.velocity.x *= -1;
    }
    if (this.y > this.height - this.radius || this.y < this.radius) {
      this.velocity.y *= -1;
    }
  }

  getPosition() {
    return [this.x, this.y];
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}
