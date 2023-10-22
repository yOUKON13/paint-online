import Brush from "./Brush";

class Rectangle extends Brush {
    private startPointX;
    private startPointY;
    private img;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    onMouseUp(e) {
        this.isMouseDown = false;
    }

    onMouseDown(e) {
        this.startPointX = e.offsetX;
        this.startPointY = e.offsetY;
        this.isMouseDown = true;
        this.img = this.canvas.toDataURL();
    }

    onMouseMove(e) {
        if (this.isMouseDown) {
            const image = new Image();
            image.src = this.img;
            image.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
                this.ctx.beginPath();
                this.ctx.rect(this.startPointX, this.startPointY, e.offsetX - this.startPointX, e.offsetY - this.startPointY);
                this.ctx.fill();
            }
        }
    }
}

export default Rectangle;