exports.getServerTime = () => Date.now();

exports.getRemainingTime = (endTime) => {
  return Math.max(0, endTime - Date.now());
};
