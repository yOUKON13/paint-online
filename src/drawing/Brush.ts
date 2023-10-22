class Brush {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected isMouseDown = false;

    constructor(canvas: HTMLCanvasElement, color: string) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.onmouseup = this.onMouseUp.bind(this);
        this.canvas.onmousedown = this.onMouseDown.bind(this);
        this.canvas.onmousemove = this.onMouseMove.bind(this);
        this.color = color;
    }

    set color(color) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
    }

    set strokeWidth(width) {
        this.ctx.lineWidth = width;
    }

    onMouseUp(e) {
    }

    onMouseDown(e) {
    }

    onMouseMove(e) {

    }
}

export default Brush;