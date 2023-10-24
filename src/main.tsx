import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PaintState, {PaintContext} from "./state";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PaintContext.Provider value={new PaintState()}>
        <RouterProvider router={router} />
    </PaintContext.Provider>
)
