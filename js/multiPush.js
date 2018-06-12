const shortArray1 = [1, 2, 3, 4];
const longArray1 = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const newArray = fillArray(shortArray1, longArray1);
function fillArray(shortArray, longArray) {
    let newArray = [];
    //вычисляем количество циклов полного копирования
    const loops = Math.floor(longArray.length / shortArray.length);
    //вычисляем количество элементов массива, которые надо будет докопировать
    const rest = longArray.length % shortArray.length;
    //копируем в новый массив данные нужное количество раз
    for (let i = 0; i < loops; i++) {
        newArray = newArray.concat(shortArray);
    }
    //копируем в конец оставшиеся элементы
    // console.log(newArray);
    return newArray.concat(shortArray.slice(0, rest)); // headingsFirst = [1, 2, 3, 4, 1, 2…]
}

console.log(newArray);
