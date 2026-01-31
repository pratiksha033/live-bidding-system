const { placeBid } = require("../services/bid.service");
const validateBid = require("../middlewares/validateBid.middleware");
const { log } = require("../utils/logger.util");
const { getServerTime } = require("../utils/time.util");

module.exports = function registerSockets(io) {
  io.on("connection", (socket) => {
    log("🔌 User connected:", socket.id);

    /* -------------------------------
       Send server time on connect
       (for timer sync requirement)
    --------------------------------*/
    socket.emit("SERVER_TIME", {
      serverTime: getServerTime(),
    });

    /* -------------------------------
       BID EVENT
    --------------------------------*/
    socket.on("BID_PLACED", (data) => {
      try {
        log("💰 BID_PLACED:", data);

        // 1️⃣ validate payload
        const validationError = validateBid(data);
        if (validationError) {
          return socket.emit("BID_ERROR", validationError);
        }

        // 2️⃣ process bid (atomic)
        const result = placeBid(data);

        if (result.error) {
          return socket.emit("BID_ERROR", result.error);
        }

        // 3️⃣ broadcast update to everyone
        io.emit("UPDATE_BID", {
          ...result.item,
          serverTime: getServerTime(), // keep clients synced
        });

        log("✅ Bid accepted:", result.item.currentBid);
      } catch (err) {
        log("❌ Socket error:", err.message);
        socket.emit("BID_ERROR", "Internal server error");
      }
    });

    /* -------------------------------
       DISCONNECT
    --------------------------------*/
    socket.on("disconnect", () => {
      log("❌ User disconnected:", socket.id);
    });
  });
};
