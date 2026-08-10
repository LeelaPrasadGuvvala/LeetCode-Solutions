/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    
    const p = new Uint8Array(n + 1);

    for (let i = 1; i <= n; i++) {
        for (let k = 1; k * k <= i; k++) {
            if (p[i - k * k] === 0) {
                p[i] = 1;
                break;
            }
        }
    }

    return p[n] === 1;
};
