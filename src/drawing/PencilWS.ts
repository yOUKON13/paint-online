import BrushWS from "./BrushWS";

class PencilWS extends BrushWS{
    public drawStart(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.data.data.x, this.data.data.y);
    }

    public drawEnd(){
        this.ctx.lineTo(this.data.data.x, this.data.data.y);
        this.ctx.stroke();
    }
}

export default PencilWS;