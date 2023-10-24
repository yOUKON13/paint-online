import Brush from "./Brush";

class Line extends Brush {
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
            this.drawEnd(e.offsetX, e.offsetY);
        }
    }

    private drawStart(img){
        this.img = img;
    }

    private drawEnd(endX, endY){
        const image = new Image();
        image.src = this.img;
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.startPointX, this.startPointY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        }

        if (!this.ws) return;
        this.ws.send(JSON.stringify({
            type: "drawEnd",
            tool: this.constructor.name,
            data: {
                img: this.img,
                x: this.startPointX,
                y: this.startPointY,
                endX,
                endY,
                stroke: this.ctx.lineWidth,
                color: this.ctx.strokeStyle
            }
        }));
    }
}

export default Line;