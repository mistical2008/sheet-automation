const fs = require('fs');
const path = require('path');
const config = require('./config');
const introText = config.introText;
let introCombosArr = [];

// Define parse function
function getKeywords(file, index) {
  const text = fs.readFileSync(file,'utf8');
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

introPart1 = getKeywords(introText, 0);
// Get heading-part 2
introPart2 = getKeywords(introText, 1);
// Get headings
introCombs(introPart1,introPart2);

// console.log(introPart1);
// console.log(introPart2);
console.log(introCombosArr);
// console.log("Всего комбинаций: " +  introCombosArr.length);
