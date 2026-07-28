/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canMakeArithmeticProgression = function(arr) {
    if (2 <= arr.length && arr.length <= 1000){
        const elementInRange = arr.every(a => (-Math.abs(10 ** 6)) <= a && a <= (10 ** 6));
        if (elementInRange) {
            arr.sort((a,b) => a - b);
            const newArr = arr.slice(1).map((a, i) => a - arr[i]);
            return newArr.slice(1).every((a,i) => a === newArr[i]);
        } else return false;
        

    } else return false;
};
