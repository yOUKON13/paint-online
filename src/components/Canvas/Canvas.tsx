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

    return <main className={style.canvas}>
        <canvas ref={canvasRef} width={600} height={400}></canvas>
    </main>
})

export default Canvas;