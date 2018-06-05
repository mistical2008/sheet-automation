var fs = require('fs');
const filename = "./heding_test.txt";
let keywords1 = [];
let keywords2 = [];

// Parse function
var text = fs.readFileSync(filename,'utf8');
console.log(text);
