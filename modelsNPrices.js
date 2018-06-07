const fs = require('fs');
// const path = require('path');

const files = fs.readdirSync('./testdir');
const parsedModels = files.map(val => {
  const res = val.match(/\w(.*?)\(/g).map(val2 => {
    return val2.replace(/\s\($/g, '');
  })
  console.log(res);
});

// console.log(files);
