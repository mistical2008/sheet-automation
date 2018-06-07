const fs = require('fs');
// const path = require('path');
const files = fs.readdirSync('./testdir');
let modelsArr = [];
let pricesArr = [];
var prodidArr = [];
let arr = [];

// Define dirname parse function
let getFn = function getFromDirName(arr, toSearch, toReplace) {
  return files.map(val => {
    return val.match(toSearch).map(val2 => {
      return arr.push(val2.replace(toReplace, ''));
    })
  });
}

// Call functions
// Construct for models
// getFromDirName(modelsArr, /\w(.*?)\(/g, /\s\($/);
// // Construct for prices
// getFromDirName(pricesArr, /\)(.*?)\d$/g, /^\)\s/);
// // Construct for product ID
// getFromDirName(prodidArr, /\((.*?)\)/g, /[\(\)]/g);
 getFn(prodidArr, /\((.*?)\)/g, /[\(\)]/g);

// // Encrease product ID by 1
prodidArr.map(val => {val + 1});
// console.log(prodidEncr());

// Logging
console.log(modelsArr);
console.log(pricesArr);
console.log(prodidArr2);
// console.log(files);
