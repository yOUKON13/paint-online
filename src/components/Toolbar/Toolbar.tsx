import React, {useContext, useEffect} from "react";
import style from "./toolbar.module.scss"
import Pencil from "../../drawing/Pencil";
import Rectangle from "../../drawing/Rectangle";
import Ellipse from "../../drawing/Ellipse";
import Eraser from "../../drawing/Eraser";
import Line from "../../drawing/Line";
import {PaintContext} from "../../state";
import {observer} from "mobx-react-lite";

const Toolbar = observer(()=>{
    const paintState = useContext(PaintContext);

    function setPencil() {
        paintState.setTool(new Pencil(paintState.canvas, paintState.color));
    }

    function setRect() {
        paintState.setTool(new Rectangle(paintState.canvas, paintState.color));
    }

    function setEllipse() {
        paintState.setTool(new Ellipse(paintState.canvas, paintState.color));
    }

    function setLine() {
        paintState.setTool(new Line(paintState.canvas, paintState.color));
    }

    function setEraser() {
        paintState.setTool(new Eraser(paintState.canvas, paintState.color));
    }

    useEffect(() => {
        if (paintState.canvas) {
            setPencil();
        }

    }, [paintState.canvas])

    return <>
        <header className={style.toolbar}>
            <button className={(paintState.currentTool instanceof Pencil && !(paintState.currentTool instanceof Eraser)) ? "active" : ""} onClick={setPencil}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button className={(paintState.currentTool instanceof Rectangle) ? "active" : ""} onClick={setRect}>
                <span className="material-symbols-outlined">rectangle</span>
            </button>
            <button className={(paintState.currentTool instanceof Ellipse) ? "active" : ""} onClick={setEllipse}>
                <span className="material-symbols-outlined">circle</span>
            </button>
            <button className={(paintState.currentTool instanceof Line) ? "active" : ""} onClick={setLine}>
                <span className="material-symbols-outlined">pen_size_2</span>
            </button>
            <button className={(paintState.currentTool instanceof Eraser) ? "active" : ""} onClick={setEraser}>
                <span className="material-symbols-outlined">ink_eraser</span>
            </button>
            <div className={style.toolbar__right}>
                <button onClick={()=>paintState.undoAction()}>
                    <span className="material-symbols-outlined">undo</span>
                </button>
                <button onClick={()=>paintState.redoAction()}>
                    <span className="material-symbols-outlined">redo</span>
                </button>
            </div>
        </header>
        <div className={style.toolbar__bottom}>
            <input type="color" onChange={(e)=>paintState.setColor(e.target.value)}/>
            <input type="number" min={1} defaultValue={1} onChange={(e)=>paintState.setStrokeWidth(e.target.value)}/>
        </div>
    </>
});

export default Toolbar;