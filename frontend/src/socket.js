import { io } from "socket.io-client";

// ✅ production-ready config
const URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const socket = io(URL, {
  transports: ["websocket"], // better for Render
});
