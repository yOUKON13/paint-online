import {useContext, useState} from "react";
import {Box, Modal} from "@mui/material";
import style from "./select-username.module.scss"
import {PaintContext} from "../../state";
import {observer} from "mobx-react-lite";

const SelectUsername = observer(()=>{
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

        ws.onopen = function () {
            ws.send(JSON.stringify({type: "connection", username}));
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