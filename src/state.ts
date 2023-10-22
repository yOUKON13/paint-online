import {makeAutoObservable} from "mobx";

class PaintState {
    public currentTool;
    public canvas;

    constructor() {
        makeAutoObservable(this)
    }

    public setTool(tool) {
        this.currentTool = tool;
    }

    public setCanvas(canvas) {
        this.canvas = canvas;
    }
}

export default PaintState;