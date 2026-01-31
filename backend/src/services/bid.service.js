const items = require("../models/item.store");
const { log } = require("../utils/logger.util");

function placeBid({ itemId, userId, amount }) {
  const item = items.find(i => i.id === itemId);

  if (!item) {
    log("❌ Item not found", itemId);
    return { error: "Item not found" };
  }

  if (Date.now() > item.endTime) {
    log("⛔ Auction ended", itemId);
    return { error: "Auction ended" };
  }

  if (amount <= item.currentBid) {
    log("⚠️ Outbid attempt", { userId, amount });
    return { error: "Outbid" };
  }

  item.currentBid = amount;
  item.highestBidder = userId;

  log("✅ Bid accepted", { itemId, userId, amount });

  return { success: true, item };
}

module.exports = { placeBid };
