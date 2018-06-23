// const brand = ('../testdir')
const path = require('path');
module.exports.workPath = path.resolve("./assets");
module.exports.domain = ("http://chasyoptom.ru/chasy/");
module.exports.headingsFile = path.resolve('./heading_test.txt');
module.exports.introText = path.resolve('./random-text.txt');
module.exports.copyFile = path.resolve('./copy-text.txt');
module.exports.settingsJSON = path.resolve('./settings.json')
// --------------------- Настройки объявления --------------------

module.exports.priceMin = (218);
module.exports.priceMax = (398);
module.exports.adIdMin = (100000);
module.exports.adIdMax = (999999);
module.exports.prodidAdd = (2);
module.exports.priceAdd = (-300);

module.exports.manager = 'Медведев Дмитрий Александрович';
module.exports.allowEmail = 'Да';
module.exports.phone = '89266217070';
module.exports.region = 'Московская область';
module.exports.city = 'Москва';
module.exports.category = 'Часы и украшения';
module.exports.goodsType = 'Часы';

// ---------------------- END -------------------
