import ExpressWs from "express-ws";
import {v4 as uuidv4} from 'uuid';

class WS {
    private readonly expressWs;
    private readonly wss;

    constructor(app) {
        this.expressWs = ExpressWs(app);
        this.wss = this.expressWs.getWss('/');

        this.expressWs.app.ws('/', (ws, req) => {
            ws["id"] = uuidv4();

            ws.on('message', (msg) => {
                this.wideSend(ws["id"], msg);
            });
        });
    }

    wideSend(senderId, msg) {
        this.wss.clients.forEach(client => {
            if(client["id"] !== senderId){
                client.send(msg);
            }
        })
    }
}

export default WS;