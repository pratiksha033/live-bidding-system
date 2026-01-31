import { useEffect } from "react";
import { socket } from "../socket";

export default function useSocket(event, handler) {
  useEffect(() => {
    socket.on(event, handler);
    return () => socket.off(event, handler);
  }, [event, handler]);
}
