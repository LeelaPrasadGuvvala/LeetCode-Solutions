/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    
    const getDigit = (num) => {
        let p = 1;
        while(num > 0) {
            p *= (num % 10);
            num = Math.floor(num / 10);
        }
        return p;
    };
    
    while (true) {
        if (getDigit(n) % t === 0) return n;
        n++;
    }
    
};
