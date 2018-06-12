const fs = require('fs');
const introBlock = "../copy-text.txt";
const copyText = fs.readFileSync(introBlock,'utf8');

// Function start
let newCopyText = replaceText();

console.log(newCopyText);
function replaceText() {
  return copyText.replace(/\%FIRSTPART\%/g, 'NEWFIRSTPART')
  .replace(/\%BRAND\%/g, 'NEWBRAND')
  .replace(/\%PRODID\%/g, 'NEWPRODID')
  .replace(/\%RANDOMTEXT\%/g, 'NEWRANDOMTEXT')
  .replace(/\%PRICE\%/g, 'NEWPRICE');
}
