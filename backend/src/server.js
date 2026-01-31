const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const registerSockets = require("./sockets");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

registerSockets(io);

server.listen(5000, () => {
  console.log("Server running on 5000");
});
console.log("🔥 NEW BACKEND VERSION DEPLOYED");

