import './styles/style.scss'
import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import PaintState from "./state";

const paintState = new PaintState();

function App() {

    return (
        <>
            <Toolbar paintState={paintState}/>
            <Canvas paintState={paintState}/>
        </>
    )
}

export default App
