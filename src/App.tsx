import './styles/style.scss'
import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import SelectUsername from "./components/SelectUsername/SelectUsername";
import {useContext, useEffect} from "react";
import {PaintContext} from "./state";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const paintState = useContext(PaintContext);

    useEffect(() => {
        if (paintState.ws) {
            paintState.ws.onmessage = function (msg) {
                const json = JSON.parse(msg.data);

                switch (json.type) {
                    case "move":
                        paintState.setUserCursor(json);
                        break;
                }
            }
        }
    }, [paintState.ws]);

    return (
        <>
            <Toolbar/>
            <Canvas/>
            <SelectUsername/>
        </>
    )
});

export default App
