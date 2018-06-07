const fs = require('fs');
const filename = "./heding_test.txt";
const combos = [];

// Define parse function
function getKeywords(index) {
  const text = fs.readFileSync(filename,'utf8');
  const parsedParagraph = text.match(/\{(.*?)\}/g).map(val => {
    return val.replace(/[\{\}]/g, '');
  });
  const parsedHeadingsKeywords = parsedParagraph[index].split('|');
  return parsedHeadingsKeywords;
  // console.log(parsedHeadingsKeywords);
};

// Define function for make conmbination of keywords in two arrays
function headingCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      combos.push(val + ". " + val2)
    })
  })
}

// Call functions
// Get heading-part 1
part1 = getKeywords(0);
// Get heading-part 2
part2 = getKeywords(1);
// Get headings
headingCombs(part1,part2);

// Logging
console.log(combos);
console.log("Всего комбинаций " + combos.length + "\n");
console.log(part1);
console.log(part2);
