// Set variables
// const fs = require('fs');
const fs = require('fs');
// const brand = ('../testdir');
let config = require('./config');
let workPath = config.workPath;
const brand = fs.readdirSync(workPath)[0]; // Get brand dir
const modelsDirs = fs.readdirSync(workPath + '/' + brand); // Get models dirs
let DB = [];
let prodidAdd = config.prodidAdd;
let priceAdd = config.priceAdd;


// Define dirname parse function
function getFromDirName(key, toSearch, toReplace) {
  return DB.map(obj => {
    let index = DB.indexOf(obj);
    let objKey = key;
    return obj.modelDir.match(toSearch).map(val => {
      DB[index][objKey] = val.replace(toReplace, '')
    })
  });
}

// Define change price/prodID function
function changeDBKey(whatToChange, key) {
  DB.map(obj => {
    let index = DB.indexOf(obj);
    let objKey = key;
    DB[index][objKey] = (whatToChange != undefined)
      ? Number(DB[index][objKey]) + whatToChange
      : Number(DB[index][objKey]);
  })
}

// Initial DB generate
function DBgen() {
  modelsDirs.map(dir => {
    function createObj() {
      let obj = {};
      // let imgsTemp = obj.imgs;
      obj.modelDir = dir;
      let modelDir = obj.modelDir;
      let tempArr = [];
      obj.imgs = fs.readdirSync(workPath + '/' + brand + '/' + dir)
      .map(img => {
        tempArr.push(config.domain + brand + '/' + modelDir + '/' + img);
      });
      obj.imgs = tempArr;
      return obj;
    }
    DB.push(createObj());
  });
  // Call functions for fill DB with model, price, prodID and change if needed
  getFromDirName('model', /\w(.*?)\(/g, /\s\($/);
  getFromDirName('price', /\)(.*?)\d$/g, /^\)\s/);
  getFromDirName('prodID', /\((.*?)\)/g, /[\(\)]/g);
  changeDBKey(prodidAdd, 'prodID');
  changeDBKey(priceAdd, 'price');
}
DBgen();
