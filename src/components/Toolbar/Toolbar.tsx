import React, {useContext, useEffect} from "react";
import style from "./toolbar.module.scss"
import Pencil from "../../drawing/Pencil";
import Rectangle from "../../drawing/Rectangle";
import Ellipse from "../../drawing/Ellipse";
import Eraser from "../../drawing/Eraser";
import Line from "../../drawing/Line";
import {PaintContext} from "../../state";
import {observer} from "mobx-react-lite";

const Toolbar = observer(() => {
    const paintState = useContext(PaintContext);

    function setTool(name) {
        paintState.setTool(eval("new " + name + "(paintState.canvas, paintState.color, paintState.ws)"));
    }

    useEffect(() => {
        if (paintState.canvas && paintState.ws) {
            setTool("Pencil");
        }

    }, [paintState.canvas, paintState.ws])

    return <>
        <header className={style.toolbar}>
            <button
                className={(paintState.currentTool instanceof Pencil && !(paintState.currentTool instanceof Eraser)) ? "active" : ""}
                onClick={() => setTool("Pencil")}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button className={(paintState.currentTool instanceof Rectangle) ? "active" : ""}
                    onClick={() => setTool("Rectangle")}>
                <span className="material-symbols-outlined">rectangle</span>
            </button>
            <button className={(paintState.currentTool instanceof Ellipse) ? "active" : ""}
                    onClick={() => setTool("Ellipse")}>
                <span className="material-symbols-outlined">circle</span>
            </button>
            <button className={(paintState.currentTool instanceof Line) ? "active" : ""}
                    onClick={() => setTool("Line")}>
                <span className="material-symbols-outlined">pen_size_2</span>
            </button>
            <button className={(paintState.currentTool instanceof Eraser) ? "active" : ""}
                    onClick={() => setTool("Eraser")}>
                <span className="material-symbols-outlined">ink_eraser</span>
            </button>
            <div className={style.toolbar__right}>
                <button onClick={() => paintState.undoAction()}>
                    <span className="material-symbols-outlined">undo</span>
                </button>
            </div>
        </header>
        <div className={style.toolbar__bottom}>
            <input type="color" onChange={(e) => paintState.setColor(e.target.value)}/>
            <input type="number" min={1} defaultValue={1} onChange={(e) => paintState.setStrokeWidth(e.target.value)}/>
        </div>
    </>
});

export default Toolbar;