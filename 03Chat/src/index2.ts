import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });
interface User {
  socket: WebSocket;
  roomId: string;
}
let allSockets :User[] = []
wss.on("connection", function (socket) {
  console.log("Client connected");
  socket.on("message", function (msg: string) {
    const parsedMsg = JSON.parse(msg);
    const type = parsedMsg.type;
    if (type === "join") {
        allSockets.push({
            socket : socket,
            roomId : parsedMsg.payload.roomId
        })
    }
    if (type === "chat") {
        const currSocket = allSockets.find(x=>x.socket ===socket);
        if(!currSocket)return;
        // const socketRoom = allSockets.find(x =>x.roomId === currSocket.roomId);
        const matchRooms = allSockets.filter(x=>x.roomId === currSocket.roomId);
        for(let i = 0 ; i < matchRooms.length; i++){
            matchRooms[i].socket.send(parsedMsg.payload.message)
        }
    }
  });
});
/*
Bhai tu chaahe toh isme:

Usernames

Timestamps

Private messages

Typing indicator*/
