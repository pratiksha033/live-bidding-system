import { io } from "socket.io-client";

// Direct backend URL (Render)
const URL = "https://live-bidding-system.onrender.com";

export const socket = io(URL, {
  transports: ["websocket"], // faster + avoids polling issues on Render
});
