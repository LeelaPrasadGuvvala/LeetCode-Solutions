/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const l = word.length;
    if (1 <=l && l <= 26) {
        let c = 0;
        const f = Math.floor(l / 8);
        const d = l % 8;
        for (let i = 1; i <= f; i++) {
            c += i * 8;
        }
        c += (f + 1) * d;
        return c;
    } else return 0;
};
