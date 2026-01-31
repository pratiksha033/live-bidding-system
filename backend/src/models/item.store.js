const now = Date.now();

module.exports = [
  {
    id: "1",
    title: "iPhone 15",
    startingPrice: 500,
    currentBid: 500,
    highestBidder: null,
    endTime: now + 10 * 60 * 1000,
  },
  {
    id: "2",
    title: "MacBook Air",
    startingPrice: 900,
    currentBid: 900,
    highestBidder: null,
    endTime: now + 8 * 60 * 1000,
  },
  {
    id: "3",
    title: "PlayStation 5",
    startingPrice: 600,
    currentBid: 600,
    highestBidder: null,
    endTime: now + 6 * 60 * 1000,
  },
];
