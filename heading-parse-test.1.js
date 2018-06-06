const fs = require('fs');
const filename = "./heding_test.txt";
combos = [];

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

array1 = getKeywords(0);
array2 = getKeywords(1);

array1.map((val) => {
  array2.map((val2) => {
    combos.push(val + " " + val2)
  })
})
console.log(combos);
console.log(combos.length);
