/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {

    let num = n, a = 0, p = 1;

    while(num > 0) {
    const d = num % 10;
        a += d;
        p *= d;
        num = Math.floor(num / 10)
    }

    return n % (a+p) === 0;
    
};
