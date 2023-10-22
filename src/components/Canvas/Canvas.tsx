import React, {useEffect, useRef} from "react";
import style from "./canvas.module.scss"
import {observer} from "mobx-react-lite";

const Canvas = observer(({paintState}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            paintState.setCanvas(canvasRef.current);
        }
    }, [canvasRef.current])

    function saveSnapshot(){
        if (canvasRef.current) {
            paintState.pushSnapshot(canvasRef.current!.toDataURL());
        }
    }

    function saveSnapshotToRedo(){
        if (canvasRef.current) {
            paintState.pushSnapshot(canvasRef.current!.toDataURL(), paintState.redoActions);
        }
    }

    return <main onMouseDown={saveSnapshot} onMouseUp={saveSnapshotToRedo} className={style.canvas}>
        <canvas ref={canvasRef} width={600} height={400}></canvas>
    </main>
})

export default Canvas;