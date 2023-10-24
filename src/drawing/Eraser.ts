import Pencil from "./Pencil";

class Eraser extends Pencil {
    onMouseMove(e) {
        this.color = "#ffffff";
        super.onMouseMove(e);
    }
}

export default Eraser;