var fs = require('fs');
const filename = "./heding_test.txt";

// Parse function
function getKeywords(index) {
  var text = fs.readFileSync(filename,'utf8');
  var parsedParagraph = text.match(/\{(.*?)\}/g).map(val => {
    return val.replace(/[\{\}]/g, '');
  });
  var parsedHeadingsKeywords = parsedParagraph[index].split('|');
  return parsedHeadingsKeywords;
  // console.log(parsedHeadingsKeywords);
};
console.log(getKeywords(0));
console.log(getKeywords(1));
