import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
interface User {
  socket: WebSocket;
  roomId: string;
}
let allsockets: User[] = [];
wss.on("connection", function (socket) {
  console.log("client connected");
  socket.on("message", function (message: string) {
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
      const roomToSendMsg = currentSocket?.roomId;
      const foundScokets = allsockets.filter((x) => x.roomId === roomToSendMsg);
      foundScokets.forEach((x) => {
        x.socket.send(JSON.stringify({
          type :"chat",
          payload : {
            message : parsedData.payload.message
          }
        }));
      });
    }
  });
  socket.on("close", function () {
    allsockets = allsockets.filter(x=> x.socket !==socket)
    console.log("Ckient disconnected");
  });
});
