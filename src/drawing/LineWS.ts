import BrushWS from "./BrushWS";

class LineWS extends BrushWS{
    public drawEnd(){
        const image = new Image();
        image.src = this.data.data.img;
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.data.data.x, this.data.data.y);
            this.ctx.lineTo(this.data.data.endX, this.data.data.endY);
            this.ctx.stroke();
        }
    }
}

export default LineWS;