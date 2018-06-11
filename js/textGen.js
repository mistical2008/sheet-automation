const fs = require('fs');
const filename = "../copy-text.txt";
const copyText = fs.readFileSync(filename,'utf8');

// Function start
const newCopyText = newFunction();

console.log(newCopyText);
function newFunction() {
  return copyText.replace(/\%FIRSTPART\%/g, 'NEWFIRSTPART')
  .replace(/\%BRAND\%/g, 'NEWBRAND')
  .replace(/\%PRODID\%/g, 'NEWPRODID')
  .replace(/\%RANDOMTEXT\%/g, 'NEWRANDOMTEXT')
  .replace(/\%PRICE\%/g, 'NEWPRICE');
}
