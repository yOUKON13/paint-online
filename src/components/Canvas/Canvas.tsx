import React, {useContext, useEffect, useRef} from "react";
import style from "./canvas.module.scss"
import {PaintContext} from "../../state";
import Cursors from "./Cursors/Cursors";
import {observer} from "mobx-react-lite";
import WS from "../../WS";

const Canvas = observer(() => {
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

    function sendCursor(e) {
        WS.send("move", {
            coords: {x: e.clientX, y: e.clientY}
        })
    }

    return <main onMouseMove={sendCursor} onMouseDown={saveSnapshot}
                 className={style.canvas}>
        <canvas ref={canvasRef} width={600} height={400}></canvas>
        <Cursors/>
    </main>
});

export default Canvas;