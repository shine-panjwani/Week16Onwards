import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
interface User {
  socket: WebSocket;
  roomId: string;
  name :string
}
let allSockets: User[] = [];
wss.on("connection", function (socket) {
  console.log("client connected");
  socket.on("message", function (message: string) {
    try {
      const parsedMsg = JSON.parse(message);
      const type = parsedMsg.type;
      if (type === "join") {
        allSockets.push({
          socket,
          roomId: parsedMsg.payload.roomId.toLowerCase(),
          name : parsedMsg.payload.name
        });
      }
      if (type === "chat") {
        const currSocket = allSockets.find((x) => x.socket === socket);
        const room = currSocket?.roomId.toLowerCase();
        const name = currSocket?.name;
        const commonRoom = allSockets.filter((x) => x.roomId === room);
        commonRoom.map((x) => {
          return x.socket.send(JSON.stringify({
            message : parsedMsg.payload.message,
            name
          }));
        });
      }
      console.log("All connected users:");
allSockets.forEach((x) => {
  console.log(`${x.name} joined room: ${x.roomId}`);
});

      // {
//   "type": "join",
//   "payload": {
//     "name": "Kirat",
//     "roomId": "ABC123"
//   }
// }
    } catch (error) {
        console.log("Invalid message recieved : " , message.toString())
        console.log(`${error}`);
        
    }
  });
  socket.on("close", function () {
    allSockets = allSockets.filter((x) => x.socket !== socket);
    console.log("Connection closed");
  });
});
