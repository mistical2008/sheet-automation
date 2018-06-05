var fs = require('fs');
filename = "./heding_test.txt"
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  // Parse function
  const parsedParagraph = data.match(/\n{(.*?)}\n/g).map(val => {
    return val.replace(/\n/g, '');
  });

  // output outcome
  console.log('Text output:\n'.toUpperCase());
  console.log(data);
  console.log('Parsed paragraph:\n'.toUpperCase());
  console.log(parsedParagraph);
});
