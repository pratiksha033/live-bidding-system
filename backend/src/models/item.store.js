// Very far future date (year 2099)
const NEVER_EXPIRE = new Date("2099-01-01").getTime();

module.exports = [
  {
    id: "1",
    title: "iPhone 15",
    startingPrice: 500,
    currentBid: 500,
    highestBidder: null,
    endTime: NEVER_EXPIRE,
  },
  {
    id: "2",
    title: "MacBook Air",
    startingPrice: 900,
    currentBid: 900,
    highestBidder: null,
    endTime: NEVER_EXPIRE,
  },
  {
    id: "3",
    title: "PlayStation 5",
    startingPrice: 600,
    currentBid: 600,
    highestBidder: null,
    endTime: NEVER_EXPIRE,
  },
];
