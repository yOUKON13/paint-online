import {makeAutoObservable} from "mobx";
import {createContext} from "react";
import randomcolor from "randomcolor";

const ACTIONS_BUFFER = 1024;

class PaintState {
    public ws;
    public username;
    public usersCursors = {};

    public currentTool;
    public canvas;
    public color = "#000000";
    private undoActions = [];
    redoActions = [];
    private undoCount = 0;

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

        if(!this.usersCursors[data.username].color){
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

        this.undoCount++;
        const url = this.undoActions.pop();
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    public redoAction() {
        if (!this.redoActions.length || !this.undoCount) return;
        this.undoCount--;
        const url = this.redoActions.shift();
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
export const PaintContext = createContext<PaintState>();