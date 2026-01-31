module.exports = function validateBid(data) {
    const { itemId, userId, amount } = data;
  
    if (!itemId || !userId || !amount)
      return "Invalid bid payload";
  
    if (amount <= 0)
      return "Bid must be greater than 0";
  
    return null;
  };
  