const items = require("../models/item.store");
const { log } = require("../utils/logger.util");

exports.getItems = (req, res) => {
  log("📦 GET /items called", {
    requestId: req.requestId,
    count: items.length,
  });

  // ✅ return serverTime + items
  res.json({
    serverTime: Date.now(),
    items,
  });
};
