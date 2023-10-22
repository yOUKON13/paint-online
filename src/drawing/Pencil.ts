import Brush from "./Brush";

class Pencil extends Brush {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    onMouseUp(e) {
        this.isMouseDown = false;
    }

    onMouseDown(e) {
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
        this.isMouseDown = true;
    }

    onMouseMove(e) {
        if(this.isMouseDown){
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
        }
    }
}

export default Pencil;