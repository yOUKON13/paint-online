import Pencil from "./Pencil";

class Eraser extends Pencil {
    constructor(canvas: HTMLCanvasElement, color) {
        super(canvas, color);
    }

    onMouseMove(e) {
        this.color = "#ffffff";
        super.onMouseMove(e);
    }
}

export default Eraser;