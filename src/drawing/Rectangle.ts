import Brush from "./Brush";
import WS from "../WS";

class Rectangle extends Brush {
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
        this.drawStart(this.canvas.toDataURL());
    }

    onMouseMove(e) {
        if (this.isMouseDown) {
            this.drawEnd(e.offsetX - this.startPointX, e.offsetY - this.startPointY);
        }
    }

    private drawStart(img) {
        this.img = img;
    }

    private drawEnd(width, height) {
        const image = new Image();
        image.src = this.img;
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(this.startPointX, this.startPointY, width, height);
            this.ctx.fill();
        }

        WS.send("drawEnd", {
            tool: this.constructor.name,
            data: {
                img: this.img,
                x: this.startPointX,
                y: this.startPointY,
                width,
                height,
                stroke: this.ctx.lineWidth,
                color: this.ctx.strokeStyle
            }
        })
    }
}

export default Rectangle;