import {useContext, useState} from "react";
import {Box, Modal} from "@mui/material";
import style from "./select-username.module.scss"
import {PaintContext} from "../../state";
import {observer} from "mobx-react-lite";
import WS from "../../WS";
import { useLocation } from 'react-router-dom';

const SelectUsername = observer(()=>{
    const location = useLocation();
    const paintState = useContext(PaintContext);
    const [isUsernameWindowOpened, setUsernameWindowOpened] = useState(true);
    const handleClose = () => {
        setUsernameWindowOpened(false);
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.values().next().value;

        const ws = new WebSocket("ws://localhost:5000/");
        paintState.setWs(ws);
        WS.setWSConnection(ws, username, location.search.slice(1));

        ws.onopen = function () {
            WS.send("connection", {});
            paintState.setUsername(username);
        }

        handleClose();
    }

    return <Modal
        open={isUsernameWindowOpened}
        onClose={handleClose}
    >
        <Box className={style.modal}>
            <h1>Select username</h1>
            <form onSubmit={onSubmit} className={style.modal__form}>
                <input name="username" type="text" minLength="3" maxLength="15"/>
                <button>Submit</button>
            </form>
        </Box>
    </Modal>;
});

export default SelectUsername;