import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
interface User {
  socket: WebSocket;
  roomId: string;
}
let allSockets: User[] = [];
wss.on("connection", function (socket) {
  console.log("client connected");
  socket.on("message", function (message: string) {
    const parsedData = JSON.parse(message);
    if (!parsedData) {
      return;
    }
    const type = parsedData.type;
    if (type === "join") {
      allSockets.push({
        roomId: parsedData.payload.roomId,
        socket: socket,
      });
    }
    if (type === "chat") {
      const currentSocket = allSockets.find((x) => x.socket === socket);
      const roomIdOfCurr = currentSocket?.roomId;
      const roomsCommon = allSockets.filter((x) => x.roomId === roomIdOfCurr);
      roomsCommon.forEach((x) => {
        x.socket.send(JSON.stringify({
          type :"chat",
          payload :{
            message : parsedData.payload.message
          }
        }));
      });
    }
  });
  socket.on("close", function () {
    allSockets = allSockets.filter((x) => x.socket !== socket);
    console.log("connection closed");
  });
});
