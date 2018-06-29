// Set variables
const fs = require('fs');
const path = require('path');
const xml = require('xml');
const rimraf = require('rimraf');
let config = require('./config');
let workPath = config.workPath;
const brand = fs.readdirSync(workPath)[0]; // Get brand dir
const brandPath = path.resolve(workPath, brand);
const modelsDirs = fs.readdirSync(workPath + '/' + brand); // Get models dirs
let prodidAdd = config.prodidAdd;
let priceAdd = config.priceAdd;
let priceMin = config.priceMin;
let priceMax = config.priceMax;
let adIdMin = config.adIdMin;
let adIdMax = config.adIdMax;
const manager = config.manager;
const allowEmail = config.allowEmail;
const phone = config.phone;
const region = config.region;
const city = config.city;
const category = config.category;
const goodsType = config.goodsType;
const deleteBrandFolder = config.deleteBrandFolder;
const headingsFile = path.resolve(workPath, config.headingsFile);
const introText = path.resolve(workPath, config.introTextFile);
const copyFile = path.resolve(workPath, config.copyFile);
const settingsJSON = path.resolve(config.settingsJSON);
const outputDir = path.resolve(__dirname, "../dist", brand);
const xmlFilePath = path.resolve(outputDir, config.outputXmlFile);
// const copyText = fs.readFileSync(copyFile,'utf8');
const headingsFull = [];
let introCombosArr = [];
let DB = [];

// Генерим заголовки (определение)
function getKeywords(file, index) {
  const headingsBlock = fs.readFileSync(file,'utf8');
  const parsedParagraph = headingsBlock.match(/\{(.*?)\}/g).map(val => {
    return val.replace(/[\{\}]/g, '');
  });
  return parsedParagraph[index].split('|');
};

// Define function for make conmbination of keywords in two arrays
function headingCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      headingsFull.push(val + ". " + val2);
    })
  })
}

// Генерим вступления (определение)
function introCombs(arr1,arr2) {
  arr1.map((val) => {
    arr2.map((val2) => {
      introCombosArr.push(val + " способны " + val2 + ".");
    })
  })
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

// Определяем функцию случайной цены
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 10;
}

// Определяем функцию для генерирования текста (добавить параметр "индекс")
function replaceText(file, part1, brand, model, prodID, intro, randomPrice) {
  const text = fs.readFileSync(file,'utf8');
  return text.replace(/\%FIRSTPART\%/g, part1)
  // .replace(/\%BRAND\%/g, brand)
  .replace(/\%PRODID\%/g, prodID)
  .replace(/\%RANDOMTEXT\%/g, intro)
  .replace(/\%PRICE\%/g, randomPrice)
  .replace(/\%MODEL%/g, model)
}


// Define dirname parse function
function getFromDirName(key, toSearch, toReplace) {
  return DB.map((obj, index) => {
    let objKey = key;
    return obj.modelDir.match(toSearch).map(val => {
      DB[index][objKey] = val.replace(toReplace, '')
    })
  });
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

// Define change price/prodID function
function changeDBKey(whatToChange, key) {
  DB.map((obj, index) => {
    let objKey = key;
    DB[index][objKey] = (whatToChange != undefined)
      ? Number(DB[index][objKey]) + whatToChange
      : Number(DB[index][objKey]);
  })
}

// Placeholder for fill DB with rest of data
function restOfData() {
  DB.map((obj, index) => {
    // let index = DB.indexOf(obj);
    let randomPrice = getRandomInt(priceMin, priceMax);
    // let firstPart = part1;
    let pID = obj.prodID;
    let intro = introCombosArr[index];
    let model = obj.model;
    obj.part1 = headingsFull[index].match(/(.*?){3,}\.\s{1}/g)[0].replace(/(\.\s{1,})$/, '');
    obj.heading = headingsFull[index];
    obj.text = replaceText(copyFile, obj.part1, brand, model, pID, intro, randomPrice)
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
      .filter(function (file) {
        return (/^(.(.?.*\.jpg$|.*\.png))*$/g).test(file)
      })

      .map(img => {
        tempArr.push(config.domain + brand + '/' + modelDir + '/' + img);
      });
      obj.imgs = tempArr;
      obj.brand = brand;
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

};


// Get heading-part 1
let part1 = getKeywords(headingsFile, 0);
// Get heading-part 2
let part2 = getKeywords(headingsFile, 1);
// Get headings
headingCombs(part1,part2);
// Shuffle headings array
shuffleArray(headingsFull);
// Get intro-part 1
introPart1 = getKeywords(introText, 0);
// Get intro-part 2
introPart2 = getKeywords(introText, 1);
// Get intros
introCombs(introPart1,introPart2);


// TASK: Generate initial DB
DBgen();

// TASK: to same length
if (part1.length > DB.length && introCombosArr.length > DB.length) {
  part1 = part1.slice(0, DB.length);
  introCombosArr = introCombosArr.slice(0, DB.length);
} else if (part1.length < DB.length && introCombosArr.length < DB.length) {
  part1 = fillArray(part1, DB);
  introCombosArr = fillArray(introCombosArr, DB);
} else if (part1.length < DB.length && introCombosArr.length > DB.length) {
  part1 = fillArray(part1, DB);
  introCombosArr = introCombosArr.slice(0, DB.length);
} else if (part1.length > DB.length && introCombosArr.length < DB.length) {
  part1 = part1.slice(0, DB.length);
  introCombosArr = fillArray(introCombosArr, DB);
}

// TASK: fill with rest of data?
restOfData();


// TASK: write data to xml
// Get adID
let randId = (fs.existsSync(settingsJSON))
  ? JSON.parse(fs.readFileSync(settingsJSON, 'utf8'))["id"]
  : getRandomInt(adIdMin, adIdMax);

  // Get ad object
let ad = DB.map((item, index) => {
  // Create empty array for images object
  let imgsArrNew = [];
  // Get images array
  let imgsArr = DB[index]["imgs"].map(imgLink => {
    return imgLink;
  }
  );
  // Create array with images object
  imgsArr.map(img => {
    imgsArrNew.push({image: {_attr: {url: img}}})
  });
  // Build object
  let adObj = {Ad:[
    {id: randId++},
    {DateBegin: 'дата и время в формате YYYY-MM-DDTHH:mm:ss+hh:mm'},
    {AllowEmail: allowEmail},
    {ManagerName: manager},
    {ContactPhone: phone},
    {Region: region},
    {City: city},
    {Category: category},
    {GoodsType: goodsType},
    {Title: DB[index]["heading"]},
    {Description: DB[index]["text"]},
    {Price: DB[index]["price"]},
    {Images:imgsArrNew}

  ]};
  // randIdLocal++;
  return adObj; // elem =
})
// TODO: refactor and rewreite to function
// Save last ID to settings.json
  let lastID = ad[ad.length - 1].Ad[0].id;
  let settingsObj = {};
  settingsObj.id = lastID;
  let json = JSON.stringify(settingsObj);
  fs.writeFileSync("./settings.json", json)

// TODO: refactor and rewreite to function
// Get XML object
let xmlString = xml({Ads: ad}, true);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
  console.log("Brand folder in './dist' created")
}
// Write XML
// fs.writeFile("./assets/*/ads.xml", xmlString, function err() {
fs.writeFile(xmlFilePath, xmlString, (err) => {
  if (err) throw err; //?
  console.log("The file was saved!");
  if (deleteBrandFolder) rimraf(brandPath, function () {
    console.log("Brand folder removed!");
  })
});
// ------------------------ END ------------------------------------
