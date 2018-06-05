var fs = require('fs');
const filename = "./heding_test.txt";
let keywords1 = [];
let keywords2 = [];

// Parse function
function getHeadingParts(file,index,arr) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;
    // console.log('OK: ' + file);
    // Parse paragraph
    var parsedParagraph = data.match(/\{(.*?)\}/g).map(val => {
      return val.replace(/[\{\}]/g, '');
    });

    // Parse 1st part keywords
    var parsedHeadingsKeywords = parsedParagraph[index].split('|');

    console.log(parsedHeadingsKeywords);
    console.log(parsedParagraph);
    // console.log(keywords1);
    // return parsedHeadingsKeywords;
    // return parsedHeadingsKeywords;

    function pushToArray(arr) {
      parsedHeadingsKeywords.map(val => {
        return arr.push(val);
      });
    };
    pushToArray(arr);

  });
};

var test = getHeadingParts(filename,0,keywords1);
console.log(keywords1);
