import Brush from "./Brush";

class Ellipse extends Brush {
    private startPointX;
    private startPointY;
    private img;

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
                this.ctx.ellipse(this.startPointX, this.startPointY, Math.abs(e.offsetX - this.startPointX), Math.abs(e.offsetY - this.startPointY), 0, 0, Math.PI*2);
                this.ctx.fill();
            }
        }
    }
}

export default Ellipse;