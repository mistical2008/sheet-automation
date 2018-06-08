/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 */
function shuffleArray(array) {
  array.map(val => {
    let i = array.length - 1;
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  })
  return array;
}

testArr = ["Awesome", "Blue", "Country", "Dino", "English", "Face", "Garbage", "Home", "Ice", "Jacob", "Kawai"];
shuffleArray(testArr);
console.log(testArr);
