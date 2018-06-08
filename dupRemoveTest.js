const uniqueArray = function(arrArg) {
  return arrArg.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos;
  });
};

const uniqEs6 = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

const testBis = ['alex', 'yuri', 'jabari', 'mike','james','james','alex'];
const removeDup = uniqEs6(testBis);
console.log(removeDup);
