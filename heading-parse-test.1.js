const fs = require('fs');
const filename = "./heding_test.txt";
const combos = [];

// Parse function
function getKeywords(index) {
  const text = fs.readFileSync(filename,'utf8');
  const parsedParagraph = text.match(/\{(.*?)\}/g).map(val => {
    return val.replace(/[\{\}]/g, '');
  });
  const parsedHeadingsKeywords = parsedParagraph[index].split('|');
  return parsedHeadingsKeywords;
  // console.log(parsedHeadingsKeywords);
};

// Make conmbination of keywords in two arrays
function headingCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      combos.push(val + ". " + val2)
    })
  })
}

// Call functions
part1 = getKeywords(0);
part2 = getKeywords(1);
headingCombs(part1,part2);

console.log(combos);
console.log("Всего комбинаций " + combos.length + "\n");
console.log(part1);
console.log(part2);
