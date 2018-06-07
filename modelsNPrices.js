const fs = require('fs');
// const path = require('path');
const files = fs.readdirSync('./testdir');
let modelsArr = [];
let pricesArr = [];
let prodidArr = [];
let obj = {};


// Define dirname parse function
function getFromDirName(arr, toSearch, toReplace) {
  return files.map(val => {
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
// prodidArr.map(val => {Number(val) + 5});
// // Encrease product ID by 1
// let prodidArr2 = prodidArr.map(val => {val + 1});
// console.log(prodidEncr());
obj.id = Number(prodidArr[0]) + 2;
obj.price = Number(pricesArr[0]) - 300;

// Logging
console.log(modelsArr);
console.log(pricesArr);
console.log(prodidArr);
console.log(obj);
// console.log(files);
