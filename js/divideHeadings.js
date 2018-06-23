const fs = require('fs');
const path = require('path');
// const config = require('./config');
const headingsFile = path.resolve('./all_headings.txt'); //?
// const headingsFull = [];

// Define parse function
function splitHeadingsFile(file) {
  let textContent = fs.readFileSync(file,'utf8');
  let i = 0;
  textContent.match(/\r\n\{(.*)\r\n/g)
  .map(val => {
    let file = "./headings/heading-" + i++ + ".txt";
    fs.writeFile(file, val, function err() {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    })
  });
};

splitHeadingsFile(headingsFile);
// Define function for make conmbination of keywords in two arrays
// function headingCombs(arr1,arr2) {
//   arr1.map((val) => {
//     arr2.map((val2) => {
//       headingsFull.push(val + ". " + val2);
//     })
//   })
// }
