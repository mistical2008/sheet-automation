var fs = require('fs');
filename = "./heding_test.txt"

function getHeadingParts(file,) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + file);
    // Parse function
    const parsedParagraph = data.match(/\{(.*?)\}/g).map(val => {
      return val.replace(/[\{\}]/g, '');
    });
    // output outcome
    console.log('Text output:\n'.toUpperCase());
    console.log(data);
    console.log('Parsed paragraph:\n'.toUpperCase());
    console.log(parsedParagraph);
  });
};

// return getHeadingParts(filename);
const headingParts = getHeadingParts(filename);
