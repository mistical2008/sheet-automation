const fs = require('fs');
const config = require('./config');
const headingsFile = config.headingsFile;
const introText = config.introText;
const copyFile = config.copyFile;
const copyText = fs.readFileSync(copyFile,'utf8');
console.log(copyText);
const workPath = config.workPath;
const brand = fs.readdirSync(workPath)[0]; // Получаем папку бренда
const modelsDirs = fs.readdirSync(workPath + '/' + brand);
let headingsFull = [];
// let headingsFirst = [];
let modelsArr = [];
let pricesArr = [];
let prodidArr = [];
let prodidAdd = config.prodidAdd;
let priceAdd = config.priceAdd;
let introCombosArr = [];
let priceMin = config.priceMin;
let priceMax = config.priceMax;
let objOut = {};

// Define parse function
function getKeywords(file, index) {
  const headingsBlock = fs.readFileSync(file,'utf8');
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
  return modelsDirs.map(val => {
    return val.match(toSearch).map(val2 => {
      return arr.push(val2.replace(toReplace, ''));
    })
  });
}

// // Define function for fill array
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
  return newArray.concat(shortArray.slice(0, rest)); // headingsFirst = [1, 2, 3, 4, 1, 2…]
}

// Define function for make conmbination of keywords in two arrays
function introCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      introCombosArr.push(val + " способны " + val2 + ".");
    })
  })
}

// Define function for replace text in copy
function replaceText() {
  return copyText.replace(/\%FIRSTPART\%/g, part1[0]) // Добавить параметр для индекса
  .replace(/\%BRAND\%/g, modelsArr[0])
  .replace(/\%PRODID\%/g, objOut.id)
  .replace(/\%RANDOMTEXT\%/g, introCombosArr[0])
  .replace(/\%PRICE\%/g, randPrice);
}

// Define function for random price generate
function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 10;
}

let randPrice = getRandomPrice(priceMin, priceMax);

// Call functions
// Construct for models
getFromDirName(modelsArr, /\w(.*?)\(/g, /\s\($/);
// Construct for prices
getFromDirName(pricesArr, /\)(.*?)\d$/g, /^\)\s/);
// Construct for product ID
getFromDirName(prodidArr, /\((.*?)\)/g, /[\(\)]/g);
// Get heading-part 1
let part1 = getKeywords(headingsFile, 0);
// Get heading-part 2
let part2 = getKeywords(headingsFile, 1);
// Get headings
headingCombs(part1,part2);
// Shuffle headings array
shuffleArray(headingsFull);
// Get intro-part 2
introPart1 = getKeywords(introText, 0);
// Get intro-part 2
introPart2 = getKeywords(introText, 1);
// Get intros
introCombs(introPart1,introPart2);

// Start conditions for arrays length ================ For review ============
if (part1.length > modelsArr.length && introCombosArr.length > modelsArr.length) {
  part1 = part1.slice(0, modelsArr.length);
  introCombosArr = introCombosArr.slice(0, modelsArr.length);
} else if (part1.length < modelsArr.length && introCombosArr.length < modelsArr.length) {
  part1 = fillArray(part1, modelsArr);
  introCombosArr = fillArray(introCombosArr, modelsArr);
} else if (part1.length < modelsArr.length && introCombosArr.length > modelsArr.length) {
  part1 = fillArray(part1, modelsArr);
  introCombosArr = introCombosArr.slice(0, modelsArr.length);
} else if (part1.length > modelsArr.length && introCombosArr.length < modelsArr.length) {
  part1 = part1.slice(0, modelsArr.length);
  introCombosArr = fillArray(introCombosArr, modelsArr);
}
// ==================================================

// Fill array with part1
// const headingFirst = fillArray(part1, modelsArr);
// Modify and add data to object

// objOut.id = (prodidAdd != undefined) ? Number(prodidArr[0]) + prodidAdd : Number(prodidArr[0]);
// objOut.price = (priceAdd != undefined) ? Number(pricesArr[0]) + priceAdd : Number(pricesArr[0]);
// New copy text

let newCopyText = replaceText();
// Logging
// console.log(headingsFull);
// console.log("Всего комбинаций " + headingsFull.length + "\n");
// console.log(part1);
// console.log(part2);
