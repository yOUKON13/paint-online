import {useContext} from "react";
import {PaintContext} from "../../../state";
import {observer} from "mobx-react-lite";
import styles from "./cursors.module.scss"
import cursorUrl from '../../../assets/cursor.svg'

const Cursors = observer(() => {
    const paintState = useContext(PaintContext);

    return <div>
        {Object.keys(paintState.usersCursors).map(user => {
            return <div key={user} className={styles.cursor} style={{left:paintState.usersCursors[user].x, top:paintState.usersCursors[user].y}}>
                <img src={cursorUrl} alt=""/>
                <div className={styles.cursor__name} style={{backgroundColor:paintState.usersCursors[user].color}}>
                    <p>{user}</p>
                </div>
            </div>
        })}
    </div>
});

export default Cursors;