import BrushWS from "./BrushWS";

class EllipseWS extends BrushWS{
    public drawEnd(){
        const image = new Image();
        image.src = this.data.data.img;
        image.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.ellipse(this.data.data.x, this.data.data.y, this.data.data.radiusX, this.data.data.radiusY, 0, 0, Math.PI*2);
            this.ctx.fill();
        }
    }
}

export default EllipseWS;