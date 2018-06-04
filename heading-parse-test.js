var fs = require('fs');
filename = "./heding_test.txt"
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  const parsedString = data.match(/\n{([^]*)}\n/g);
  console.log(parsedString);
});
