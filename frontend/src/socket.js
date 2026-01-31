import { io } from "socket.io-client";   // ⭐ REQUIRED

const URL = "https://live-bidding-system.onrender.com";

export const socket = io(URL, {
  transports: ["websocket"],
});
