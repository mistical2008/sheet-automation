const fs = require('fs');
const headingsFile = "../heding_test.txt";
const copyFile = "../copy-text.txt";
const copyText = fs.readFileSync(copyFile,'utf8');
const files = fs.readdirSync('../testdir');
let headingsFull = [];
// let headingsFirst = [];
let modelsArr = [];
let pricesArr = [];
let prodidArr = [];
let objOut = {};

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

// Define dirname parse function
function getFromDirName(arr, toSearch, toReplace) {
  return files.map(val => {
    return val.match(toSearch).map(val2 => {
      return arr.push(val2.replace(toReplace, ''));
    })
  });
}

// Define function for fill array
function fillArray(shortArray, longArray) {
  let newArray = [];
  //вычисляем количество циклов полного копирования
  const loops = Math.floor(longArray.length / shortArray.length);
  //вычисляем количество элементов массива, которые надо будет докопировать
  const rest = longArray.length % shortArray.length;
  //копируем в новый массив данные нужное количество раз
  for (let i = 0; i < loops; i++) {
      newArray = newArray.concat(shortArray);
  }
  //копируем в конец оставшиеся элементы
  // console.log(newArray);
  return newArray.concat(shortArray.slice(0, rest)); // headingsFirst = [1, 2, 3, 4, 1, 2…]
}

// Define function for replace text in copy
function replaceText() {
  return copyText.replace(/\%FIRSTPART\%/g, 'NEWFIRSTPART')
  .replace(/\%BRAND\%/g, 'NEWBRAND')
  .replace(/\%PRODID\%/g, 'NEWPRODID')
  .replace(/\%RANDOMTEXT\%/g, 'NEWRANDOMTEXT')
  .replace(/\%PRICE\%/g, 'NEWPRICE');
}

// Call functions
// Construct for models
getFromDirName(modelsArr, /\w(.*?)\(/g, /\s\($/);
// Construct for prices
getFromDirName(pricesArr, /\)(.*?)\d$/g, /^\)\s/);
// Construct for product ID
getFromDirName(prodidArr, /\((.*?)\)/g, /[\(\)]/g);
// Get heading-part 1
const part1 = getKeywords(0);
// Get heading-part 2
const part2 = getKeywords(1);
// Fill array with part1
const headingFirst = fillArray(part1, modelsArr);
// Get headings
headingCombs(part1,part2);
// Shuffle array
shuffleArray(headingsFull);
// Modify and add data to object
objOut.id = Number(prodidArr[0]) + 2;
objOut.price = Number(pricesArr[0]) + 300;
// New copy text
let newCopyText = replaceText();

// Logging
console.log(headingsFull);
console.log("Всего комбинаций " + headingsFull.length + "\n");
console.log(part1);
console.log(part2);
