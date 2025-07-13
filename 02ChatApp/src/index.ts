import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
interface User {
  socket: WebSocket;
  room: string;
}
// let allSockets: WebSocket[] = [];
let allSockets: User[] = [];
wss.on("connection", function (socket) {

  console.log("Client connected");
  socket.on("message", function (e: string) {
    console.log("Mess ge sent from client : " + e.toString());

    const parsedData = JSON.parse(e);
    const type = parsedData.type;
    if (type === "join") {
      allSockets.push({
        socket,
        room: parsedData.payload.room,
      });
    }
    if (type === "chat") {
      const currSocket = allSockets.find((x) => x.socket === socket);
      if (!currSocket) {
        return;
      }
      currSocket.socket.send(parsedData.payload.message);
    }
  });
  socket.on("close", function () {
    allSockets = allSockets.filter((x) => x.socket !== socket);
    console.log("client disconnected");
  });
});
