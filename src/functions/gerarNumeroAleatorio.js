module.exports = (min = 0, max = 10) =>
  min + Math.floor(Math.random() * (max + 1));