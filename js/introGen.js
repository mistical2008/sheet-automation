const fs = require('fs');
const introText = "../random-text.txt";
const introCombosArr = [];

// Define parse function
function getKeywords(index) {
  const text = fs.readFileSync(introText,'utf8');
  const parsedParagraph = text.match(/\{(.*?)\}/g).map(val => {
    return val.replace(/[\{\}]/g, '');
  });
  return parsedParagraph[index].split('|');
};

// Define function for make conmbination of keywords in two arrays
function introCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      introCombosArr.push(val + " способны " + val2 + ".");
    })
  })
}

introPart1 = getKeywords(0);
// Get heading-part 2
introPart2 = getKeywords(1);
// Get headings
introCombs(introPart1,introPart2);

// console.log(introPart1);
// console.log(introPart2);
console.log(introCombosArr);
console.log("Всего комбинаций: " +  introCombosArr.length);
