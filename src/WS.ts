class WS {
    private static ws;
    private static username;
    private static lobby;

    public static setWSConnection(ws, username, lobby) {
        WS.ws = ws;
        WS.username = username;
        WS.lobby = lobby;
    }

    public static send(type, data) {
        if(!WS.ws) return;
        WS.ws.send(JSON.stringify({type, username: WS.username, lobby: WS.lobby, ...data}));
    }
}

export default WS;