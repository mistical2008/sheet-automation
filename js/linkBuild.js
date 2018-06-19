// Задаем переменные
// const fs = require('fs');
const fs = require('fs');
// const brand = ('../testdir');
let config = require('./config');
let workPath = config.workPath;
const brand = fs.readdirSync(workPath)[0]; // Получаем папку бренда
// const cleanBrand = workPath.replace(/.\/assets/, '');
const modelsDirs = fs.readdirSync(workPath + '/' + brand); // Получаем папки моделей
let imgsObj = [];
// Поучаем имена картинок в папке моделей
modelsDirs.map(dir => {
  function createObj() {
    let obj = {};
    obj.modelDir = dir;
    obj.imgs = fs.readdirSync(workPath + '/' + brand + '/' + dir);
    return obj;
  }
  object = createObj();
  imgsObj.push(object);
})

// Database build with link constructor
function linkBuild() {
  imgsObj.map(index => {
    let modelDir = index.modelDir;
    let imgsTemp = index.imgs;
    let tempArr = [];
    index.imgs.map(img => {
      tempArr.push(config.domain + brand + '/' + modelDir + '/' + img);
    })
    console.log(tempArr);
    return index.imgs = tempArr;
  })
}
linkBuild();
console.log(imgsObj);

/*
imgsObj = [
  {
  modelDir: dir,
  imgs: fs.readdirSync(dir)
  },
  {
  modelDir: dir,
  imgs: fs.readdirSync(dir)
  }
]
*/
