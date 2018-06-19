const fs = require('fs');
const path = require('path');
const config = require('./config');
const workPath = config.workPath;
const brand = fs.readdirSync(workPath)[0]; // Получаем папку бренда
// const path = require('path');
const modelsDirs = fs.readdirSync(workPath + '/' + brand);
const priceAdd = config.priceAdd;
const prodidAdd = config.prodidAdd;
let modelsArr = [];
let pricesArr = [];
let prodidArr = [];
let objOut = {};


// Define dirname parse function
function getFromDirName(arr, toSearch, toReplace) {
  return modelsDirs.map(val => {
    return val.match(toSearch).map(val2 => {
      return arr.push(val2.replace(toReplace, ''));
    })
  });
}

// Call functions
// Construct for models
getFromDirName(modelsArr, /\w(.*?)\(/g, /\s\($/);
// Construct for prices
getFromDirName(pricesArr, /\)(.*?)\d$/g, /^\)\s/);
// Construct for product ID
getFromDirName(prodidArr, /\((.*?)\)/g, /[\(\)]/g);
// Modify and add data to object
objOut.id = Number(prodidArr[0]) + prodidAdd;
objOut.price = Number(pricesArr[0]) + priceAdd;

// Logging
console.log(modelsArr);
console.log(modelsDirs);
console.log(pricesArr);
console.log(prodidArr);
console.log(objOut);
// console.log(files);
