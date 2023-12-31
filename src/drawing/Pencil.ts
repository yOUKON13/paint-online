import Brush from "./Brush";
import WS from "../WS";

class Pencil extends Brush {
    onMouseUp(e) {
        this.isMouseDown = false;
    }

    onMouseDown(e) {
        this.drawStart(e.offsetX, e.offsetY)
        this.isMouseDown = true;
    }

    onMouseMove(e) {
        if (this.isMouseDown) {
            this.drawEnd(e.offsetX, e.offsetY);
        }
    }

    private drawStart(drawStartX, drawStartY) {
        this.ctx.beginPath();
        this.ctx.moveTo(drawStartX, drawStartY);

        WS.send("drawStart", {
            tool: this.constructor.name,
            data: {
                x: drawStartX,
                y: drawStartY,
            }
        })
    }

    private drawEnd(drawEndX, drawEndY) {
        this.ctx.lineTo(drawEndX, drawEndY);
        this.ctx.stroke();

        WS.send("drawEnd", {
            tool: this.constructor.name,
            data: {
                x: drawEndX,
                y: drawEndY,
                stroke: this.ctx.lineWidth,
                color: this.ctx.strokeStyle
            }
        })
    }
}

export default Pencil;