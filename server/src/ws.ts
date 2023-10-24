import ExpressWs from "express-ws";
import {v4 as uuidv4} from 'uuid';
import {Express} from "express";

class WS {
    private readonly expressWs;
    private readonly wss;

    constructor(app: Express) {
        this.expressWs = ExpressWs(app);
        this.wss = this.expressWs.getWss();

        this.expressWs.app.ws('/', (ws: any, req) => {
            ws["id"] = uuidv4();

            ws.on('message', (msg: string) => {
                const json = JSON.parse(msg);
                if (json.type === "connection") {
                    ws["lobby"] = json.lobby;
                }

                this.wideSend(ws["id"], msg, json.lobby);
            });
        });
    }

    wideSend(senderId: string, msg: any, lobby) {
        this.wss.clients.forEach((client: any) => {
            if (client["id"] !== senderId && client["lobby"] === lobby) {
                client.send(msg);
            }
        })
    }
}

export default WS;