import {makeAutoObservable} from "mobx";
import {createContext} from "react";
import randomcolor from "randomcolor";
import WS from "./WS";

const ACTIONS_BUFFER = 1024;

class PaintState {
    public ws;
    public username;
    public usersCursors = {};

    public currentTool;
    public canvas;
    public color = "#000000";
    private undoActions = [];

    constructor() {
        makeAutoObservable(this)
    }

    public setWs(ws) {
        this.ws = ws;
    }

    public setUsername(username) {
        this.username = username;
    }

    public setUserCursor(data) {
        this.usersCursors[data.username] = {...this.usersCursors[data.username], ...data.coords};

        if (!this.usersCursors[data.username].color) {
            this.usersCursors[data.username].color = randomcolor();
        }
    }

    public setTool(tool) {
        this.currentTool = tool;
    }

    public setCanvas(canvas) {
        this.canvas = canvas;
    }

    public setColor(color) {
        this.color = color;
        this.currentTool.color = color;
    }

    public setStrokeWidth(width) {
        this.currentTool.strokeWidth = width;
    }

    public pushSnapshot(url, arr = this.undoActions) {
        if (arr.length >= ACTIONS_BUFFER) {
            arr.shift();
        }
        arr.push(url)
    }

    public undoAction() {
        if (!this.undoActions.length) return;

        const url = this.undoActions.pop();
        this.setAction(url);

        WS.send("undo", {data:url});
    }

    public setAction(url){
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

export default PaintState;
export const PaintContext = createContext<PaintState>(new PaintState());