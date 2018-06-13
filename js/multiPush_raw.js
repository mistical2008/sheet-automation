var shortArray = ["one" , 2, 3, 4, 5, 6];
var longArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var newArray =[];
//вычисляем количество циклов полного копирования
var loops = Math.floor(longArray.length/shortArray.length);
//вычисляем количество элементов массива, которые надо будет докопировать
var rest = longArray.length%shortArray.length;
//копируем в новый массив данные нужное количество раз
for (let i = 0; i < loops; i++) {
    newArray = newArray.concat(shortArray);
}
//копируем в конец оставшиеся элементы
newArray = newArray.concat(shortArray.slice(0, rest));
console.log(newArray);
