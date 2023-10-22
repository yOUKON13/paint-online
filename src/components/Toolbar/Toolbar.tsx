import React, {useEffect} from "react";
import style from "./toolbar.module.scss"
import {observer} from "mobx-react-lite";
import Pencil from "../../drawing/Pencil";
import Rectangle from "../../drawing/Rectangle";

const Toolbar = observer(({paintState}) => {
    function setPencil() {
        paintState.setTool(new Pencil(paintState.canvas));
    }

    function setRect() {
        paintState.setTool(new Rectangle(paintState.canvas));
    }

    useEffect(() => {
        if (paintState.canvas) {
            setPencil();
        }
    }, [paintState.canvas])

    return <header className={style.toolbar}>
        <button className={(paintState.currentTool instanceof Pencil) ? "active" : ""} onClick={setPencil}>
            <span className="material-symbols-outlined">edit</span>
        </button>
        <button className={(paintState.currentTool instanceof Rectangle) ? "active" : ""} onClick={setRect}>
            <span className="material-symbols-outlined">rectangle</span>
        </button>
    </header>
});

export default Toolbar;