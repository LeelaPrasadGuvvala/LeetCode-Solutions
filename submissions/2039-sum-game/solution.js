/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {

    const n = num.length;
    const half = n >> 1;

    let leftSum = 0, rightSum = 0;
    let leftQ = 0, rightQ = 0;

    for (let i = 0; i < n; i++) {
        const code = num.charCodeAt(i);
        if (i < half) {
            if (code === 63) leftQ++; // 63 is ASCII for '?'
            else leftSum += code - 48;
        } else {
            if (code === 63) rightQ++;
            else rightSum += code - 48;
        }
    }

    if ((leftQ + rightQ) & 1) return true;

    return (leftSum - rightSum) !== ((rightQ - leftQ) / 2) * 9;
};
