const fs = require('fs');
const filename = "../random-text.txt";
const introCombosArr = [];

// Define parse function
function getKeywords(index) {
  const text = fs.readFileSync(filename,'utf8');
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

part1 = getKeywords(0);
// Get heading-part 2
part2 = getKeywords(1);
// Get headings
introCombs(part1,part2);

console.log(part1);
console.log(part2);
console.log(introCombosArr);
console.log("Всего комбинаций: " +  introCombosArr.length);
