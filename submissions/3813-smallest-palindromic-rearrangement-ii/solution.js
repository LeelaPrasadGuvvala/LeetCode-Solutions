const maxLength = 10 ** 4;
const fact = new Array(maxLength);
fact[0] = 1n;
for(let i = 1; i < maxLength; i++) {
    fact[i] = fact[i - 1] * BigInt(i);
}

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var smallestPalindrome = function(s, k) {
    if ((1 <= s.length && s.length <= 10 ** 4) && (1 <= k && k <= 10 ** 6)) {
        const count = new Array(26).fill(0);
        const charoffSet = 97;
        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - charoffSet]++;
        }

        // Find out position
        let oddCount = 0;
        let middleChar = '';
        let frontLength = 0;
        const frequencies = new Array(26).fill(0);

        for(let i = 0; i < 26; i++) {
             if (count[i] % 2 !== 0) {
                oddCount++;
                middleChar = String.fromCharCode(i + charoffSet);
            }
            const half = Math.floor(count[i]/2);
            if (half > 0) {
                frequencies[i] = half;
                frontLength += half;
            }
        }

        // console.log('oddCount : ' + oddCount);
        if (oddCount > 1) return '';

        let den = 1n;
        for (let i = 0; i < 26; i++) {
            if (frequencies[i] > 0) {
                den *= fact[frequencies[i]];
            }
        }
        let totalCombinations = fact[frontLength]/den;

        let target = BigInt(k);

        if (target > totalCombinations || target < 1n) return '';

        let frontHalfArr = [];
        let remLength = BigInt(frontLength);

        for (let i = 0; i < frontLength; i++) {
            for (let c = 0; c < 26; c++) {
                if (frequencies[c] === 0) continue;

                const combinations = (totalCombinations * BigInt(frequencies[c])) / remLength;

                if (target <= combinations) {
                    frontHalfArr.push(String.fromCharCode(c + charoffSet));
                    frequencies[c]--;
                    totalCombinations = combinations;
                    break;
                } else {
                    target -= combinations;
                }
            }
            remLength--;
        }

        const frontHalf = frontHalfArr.join('');
        const backHalf = frontHalfArr.reverse().join('');
        return frontHalf + middleChar + backHalf;

    } else return '';
    
};
