import React, {useContext, useEffect, useRef} from "react";
import style from "./canvas.module.scss"
import {PaintContext} from "../../state";
import Cursors from "./Cursors/Cursors";
import {observer} from "mobx-react-lite";

const Canvas = observer(()=>{
    const paintState = useContext(PaintContext);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            paintState.setCanvas(canvasRef.current);
        }
    }, [canvasRef.current])

    function saveSnapshot() {
        if (canvasRef.current) {
            paintState.pushSnapshot(canvasRef.current!.toDataURL());
        }
    }

    function saveSnapshotToRedo() {
        if (canvasRef.current) {
            paintState.pushSnapshot(canvasRef.current!.toDataURL(), paintState.redoActions);
        }
    }

    function sendCursor(e) {
        paintState.ws.send(JSON.stringify({
            type: "move",
            username: paintState.username,
            coords: {x: e.pageX, y: e.pageY}
        }))
    }

    return <main onMouseMove={sendCursor} onMouseDown={saveSnapshot} onMouseUp={saveSnapshotToRedo}
                 className={style.canvas}>
        <canvas ref={canvasRef} width={600} height={400}></canvas>
        <Cursors/>
    </main>
});

export default Canvas;