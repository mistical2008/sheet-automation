let init = 218;
let til = 398;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let res = getRandomInt(init, til) * 10;
console.log(res);
