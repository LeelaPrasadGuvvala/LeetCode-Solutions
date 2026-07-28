/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (typeof x === 'number' && (-Math.abs(2 ** 31) <= x && x <= (2 ** 31) - 1)) {
        const y = String(x).split('').reverse().join('');
        return x === Number(y);
    } else return false;
};
