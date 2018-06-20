// Задаем переменные
// const fs = require('fs');
const fs = require('fs');
// const brand = ('../testdir');
let config = require('./config');
let workPath = config.workPath;
const brand = fs.readdirSync(workPath)[0]; // Получаем папку бренда
// const cleanBrand = workPath.replace(/.\/assets/, '');
const modelsDirs = fs.readdirSync(workPath + '/' + brand); // Получаем папки моделей
let DB = [];

// Генерация базы папок моделей и адресов изображений
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
}
DBgen();
