import Brush from "./Brush";
import WS from "../WS";

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
        this.drawStart(this.canvas.toDataURL());
    }

    onMouseMove(e) {
        if (this.isMouseDown) {
            this.drawEnd(Math.abs(e.offsetX - this.startPointX), Math.abs(e.offsetY - this.startPointY));
        }
    }

    private drawStart(img) {
        this.img = img;
    }

    private drawEnd(radiusX, radiusY) {
        const image = new Image();
        image.src = this.img;
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.ellipse(this.startPointX, this.startPointY, radiusX, radiusY, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }

        WS.send("drawEnd", {
            tool: this.constructor.name,
            data: {
                img: this.img,
                x: this.startPointX,
                y: this.startPointY,
                radiusX,
                radiusY,
                stroke: this.ctx.lineWidth,
                color: this.ctx.strokeStyle
            }
        })
    }
}

export default Ellipse;