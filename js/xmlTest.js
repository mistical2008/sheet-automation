const fs = require('fs');
const path = require('path');
const config = require('./config');

// --------------------- BEGIN --------------------
const xml = require('xml');
const manager = 'ФИО';
const allowEmail = 'Да';
const phone = '555555555';
const region = 'RU';
const city = 'Москва';
const category = 'Часы и украшения';
const goodsType = 'Часы';
const settingsJSON = path.resolve('./settings.json')
let adIdMin = config.adIdMin;
let adIdMax = config.adIdMax;
// ---------------------- END -------------------

// Define function for random num
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 10;
}

// Test DB object
const DB = [{
  part1: "часть1",
  heading: "Заголовок",
  brand: "Имя бренда",
  model: "Название бренда и модели",
  price: "$1000",
  prodID: 34543,
  text: "Брюки\nВерхняя одежда\nДжинсы\nКупальники",
  imgs: [
    "domain.ru/chasy/бренд/модель/картинка1.jpg",
    "domain.ru/chasy/бренд/модель/картинка2.jpg",
    "domain.ru/chasy/бренд/модель/картинка3.jpg"
  ]
},
{
  part1: "часть1-2",
  heading: "Заголовок 2",
  brand: "Имя бренда 2",
  model: "Название бренда и модели",
  price: "значение цены",
  prodID: 34546,
  text: "Текст объявления 2",
  imgs: [
    "domain.ru/chasy/бренд/модель/картинка1.jpg",
    "domain.ru/chasy/бренд/модель/картинка2.jpg"
  ]
}];

// ------------------- BEGIN ---------------------------
// Get random adID
let randId = (fs.existsSync(settingsJSON))
  ? JSON.parse(fs.readFileSync(settingsJSON, 'utf8'))["id"]
  : getRandomInt(adIdMin, adIdMax);

  // Get ad object
let ad = DB.map(item => {
  // let randIdLocal = randId;
  // Get index of current element
  let index = DB.indexOf(item);
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
    {DateBegin: 'YYYY-MM-DD'},
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
// Get id in adObj[lasElement][Ad][id] if ./settings.json not exist and write to settings.json
  let lastID = ad[ad.length - 1].Ad[0].id;
  let settingsObj = {};
  settingsObj.id = lastID;
  let json = JSON.stringify(settingsObj);
  fs.writeFileSync("./settings.json", json)

// Get XML object
let xmlString = xml({Ads: ad}, true);

// Write XML
fs.writeFile("./test.xml", xmlString, function err() {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
})
// ------------------------ END ------------------------------------
