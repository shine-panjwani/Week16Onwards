import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
interface User {
  socket: WebSocket;
  roomId: string;
}
let allSockets: User[] = [];
wss.on("connection", function (socket) {
  console.log("Client connected");
  socket.on("message", function (msg: string) {
    const parsedMsg = JSON.parse(msg);
    const type = parsedMsg.type;
    if (type === "join") {
      allSockets.push({
        socket,
        roomId: parsedMsg.payload.roomId,
      });
    }
    if (type === "chat") {
      const currSocket = allSockets.find((x) => x.socket === socket);
      if (!currSocket) {
        return;
      }
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].roomId === currSocket.roomId) {
          allSockets[i].socket.send(parsedMsg.payload.message);
        }
      }
    }
  });
  socket.on("close", () => {
    allSockets = allSockets.filter((u) => u.socket !== socket);
  });
});
