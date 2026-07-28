/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if (typeof x  === 'number' && (-Math.abs(2 ** 31) <= x && x <= (2 ** 31) - 1)) {
        var y = 0;
        if (x < 0) {
            y = Number('-' + String(x).split('').slice(1).reverse().join(''));
        } else y = Number(String(x).split('').reverse().join(''));
        return (-Math.abs(2 ** 31) <= y && y <= (2 ** 31) - 1) ? y : 0;
    } else return 0;
};
