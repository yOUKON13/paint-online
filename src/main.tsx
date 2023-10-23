import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PaintState, {PaintContext} from "./state";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PaintContext.Provider value={new PaintState()}>
        <App/>
    </PaintContext.Provider>
)
