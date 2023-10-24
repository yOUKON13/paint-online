class BrushWS{
    protected ctx;

    constructor(protected canvas, protected data) {
        this.ctx = canvas.getContext("2d");
    }

    public draw(){
        if(this.data.type === "drawStart"){
            return this.drawStart();
        }

        this.ctx.lineWidth = this.data.data.stroke;
        this.ctx.strokeStyle = this.data.data.color;
        this.ctx.fillStyle = this.data.data.color;

        this.drawEnd();
    }

    private drawStart(){

    }

    private drawEnd(){

    }
}

export default BrushWS;