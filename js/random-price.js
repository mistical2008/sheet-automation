let priceMin = 218;
let priceMax = 398;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let res = getRandomInt(priceMin, priceMax) * 10;
console.log(res);
