const fs = require('fs');
const headingsFile = "../heding_test.txt";
const headingsFull = [];

// Define parse function
function getKeywords(index) {
  const headingsBlock = fs.readFileSync(headingsFile,'utf8');
  const parsedParagraph = headingsBlock.match(/\{(.*?)\}/g).map(val => {
    return val.replace(/[\{\}]/g, '');
  });
  return parsedParagraph[index].split('|');
};

// Define function for removing duplicates
const remDup = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

// Define function for make conmbination of keywords in two arrays
function headingCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      headingsFull.push(val + ". " + val2);
    })
  })
}

// Define shuffle array function
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

// Call functions
// Get heading-part 1
part1 = getKeywords(0);
// Get heading-part 2
part2 = getKeywords(1);
// Get headings
headingCombs(part1,part2);
// Shuffle array
shuffleArray(headingsFull);

// Logging
console.log(headingsFull);
console.log("Всего комбинаций " + headingsFull.length + "\n");
console.log(part1.length);
console.log(part2);
