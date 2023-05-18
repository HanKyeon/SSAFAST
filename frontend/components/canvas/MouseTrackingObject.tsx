export const a: number = 1;

export interface MTOInterface {
  setting: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

// window.addEventListener('mousemove', function (event) {
//   this.mx = event.x;
//   this.my = event.y;
// });

export class MTO implements MTOInterface {
  mx: number;
  my: number;
  bx: number;
  by: number;
  directionX: number;
  directionY: number;
  canvasWidth: number;
  canvasHeight: number;
  size: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number, color: string) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mx = -500;
    this.my = -500;
    this.directionX = Math.random() * 0.2 - 0.1;
    this.directionY = Math.random() * 0.2 - 0.1;
    this.size = 0;
    this.bx = Math.random() * (canvasWidth - 50 * 2 - 50 * 2) + 50 * 2;
    this.by = Math.random() * (canvasHeight - 50 * 2 - 50 * 2) + 50 * 2;
    this.color = color;
  }

  setting() {
    window.addEventListener('mousemove', (event) => {
      this.mx = event.x;
      this.my = event.y;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(this.mx, this.my);
    ctx.beginPath();
    ctx.arc(this.bx, this.by, this.size, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    this.bx += this.directionX;
    this.by += this.directionY;

    if (
      this.mx - this.bx < 38 &&
      this.mx - this.bx > -38 &&
      this.my - this.by < 38 &&
      this.my - this.by > -38
    ) {
      if (this.size < 38) {
        this.size += 10;
        // this.bx -= Math.random() * 3;
        // this.by += Math.random() * 3;
      }
    } else if (this.size > 0) {
      this.size -= 0.2;
    }
    if (this.size <= 0) {
      this.size = 0;
    }
    if (this.bx > this.canvasWidth || this.bx < -10) {
      this.bx = Math.random() * (this.canvasWidth - 50 * 2 - 50 * 2) + 50 * 2;
      this.size = 0;
    }
    if (this.by > this.canvasHeight || this.by < -10) {
      this.by = Math.random() * (this.canvasHeight - 50 * 2 - 50 * 2) + 50 * 2;
      this.size = 0;
    }
  }
}
