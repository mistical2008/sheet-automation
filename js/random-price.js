const config = require('./config');
let priceMin = config.priceMin;
let priceMax = config.priceMax;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 10;
}

let randPrice = getRandomInt(priceMin, priceMax);
