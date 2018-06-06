array1 = ["mom", "wash", "ram"];
array2 = ["two step", "one step", "three step"];

combos = [] //or combos = new Array(2);

// for(var i = 0; i < array1.length; i++)
// {
//      for(var j = 0; j < array2.length; j++)
//      {
//         //you would access the element of the array as array1[i] and array2[j]
//         //create and array with as many elements as the number of arrays you are to combine
//         //add them in
//         //you could have as many dimensions as you need
//         combos.push(array1[i] + " " + array2[j])
//      }
// }

// Reproduce for loop with map()
array1.map((val) => {
  array2.map((val2) => {
    combos.push(val + " " + val2)
  })
})
console.log(combos);
