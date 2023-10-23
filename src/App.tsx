import './styles/style.scss'
import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import PaintState from "./state";
import {useEffect} from "react";

const paintState = new PaintState();

function App() {
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000/");
        ws.onopen = function () {
            ws.send(JSON.stringify({type: "connected", "username": Math.random()}));
        }

        ws.onmessage = function (msg) {
            console.log(msg.data);
        }
    }, []);

    return (
        <>
            <Toolbar paintState={paintState}/>
            <Canvas paintState={paintState}/>
        </>
    )
}

export default App
