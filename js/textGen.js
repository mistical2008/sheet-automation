const fs = require('fs');
const config = require('./config');
const copyFile = config.copyFile;

// Function start
let newCopyText = replaceText(copyFile);

console.log(newCopyText);
function replaceText(file, part1, brand, prodID, intro, randomPrice) {
  const text = fs.readFileSync(file,'utf8');
  return text.replace(/\%FIRSTPART\%/g, part1)
  .replace(/\%BRAND\%/g, brand)
  .replace(/\%PRODID\%/g, prodID)
  .replace(/\%RANDOMTEXT\%/g, intro)
  .replace(/\%PRICE\%/g, randomPrice);
}
