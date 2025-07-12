import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 3000 });
wss.on("connection", function (socket) {
  console.log("Connection open");
  socket.on("message", function (e) {
    
    if (e.toString().toLowerCase() === "ping") {
      socket.send("Message from server : pong");
    }
  });
  socket.on("close", () => {
    console.log("Connection closed");
  });
});