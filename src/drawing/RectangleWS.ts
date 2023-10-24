import BrushWS from "./BrushWS";

class RectangleWS extends BrushWS{
    public drawEnd(){
        const image = new Image();
        image.src = this.data.data.img;
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(this.data.data.x, this.data.data.y, this.data.data.width, this.data.data.height);
            this.ctx.fill();
        }
    }
}

export default RectangleWS;