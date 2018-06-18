// Задаем переменные
// const fs = require('fs');
const fs = require('fs');
// const brand = ('../testdir');
let config = require('./config');
let brand = config.brand;
const cleanBrand = brand.replace(/../, ''); // Получаем папку бренда
const modelsDirs = fs.readdirSync(brand); // Получаем папки моделей
let imgsObj = [];
//== Сценарий 1
// Поучаем имена картинок в папке моделей
modelsDirs.map(dir => {
  function createObj() {
    let obj = {};
    obj.modelDir = dir;
    obj.imgs = fs.readdirSync(brand + '/' + dir);
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
      tempArr.push("domen.ru/chasy/" + modelDir + '/' + img);
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
