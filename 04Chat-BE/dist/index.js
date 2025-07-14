"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
let allsockets = [];
wss.on("connection", function (socket) {
    console.log("client connected");
    socket.on("message", function (message) {
        const parsedData = JSON.parse(message);
        const type = parsedData.type;
        if (type === "join") {
            allsockets.push({
                socket,
                roomId: parsedData.payload.roomId,
            });
        }
        if (type === "chat") {
            const currentSocket = allsockets.find((x) => x.socket === socket);
            const roomToSendMsg = currentSocket === null || currentSocket === void 0 ? void 0 : currentSocket.roomId;
            const foundScokets = allsockets.filter((x) => x.roomId === roomToSendMsg);
            foundScokets.forEach((x) => {
                x.socket.send(JSON.stringify({
                    type: "chat",
                    payload: {
                        message: parsedData.payload.message
                    }
                }));
            });
        }
    });
    socket.on("close", function () {
        allsockets = allsockets.filter(x => x.socket !== socket);
        console.log("Ckient disconnected");
    });
});
