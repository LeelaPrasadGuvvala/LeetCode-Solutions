/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
    
    const kFactorCounts = [
        {}, {}, 
        {2: 1}, 
        {3: 1}, 
        {2: 2}, 
        {5: 1}, 
        {2: 1, 3: 1}, 
        {7: 1}, 
        {2: 3}, 
        {3: 2}
    ];

    let tempT = t;
    const primeCount = { 2: 0, 3: 0, 5: 0, 7: 0 };
    for (const prime of [2, 3, 5, 7]) {
        while (tempT % prime === 0) {
            tempT /= prime;
            primeCount[prime]++;
        }
    }
    if (tempT !== 1) return "-1";

    function getFactorCount(count) {
        const res = { 2: 0, 3: 0, 4: 0, 5: count[5], 6: 0, 7: count[7], 8: 0, 9: 0 };
        
        let c8 = Math.floor(count[2] / 3);
        let rem2 = count[2] % 3;
        
        let c9 = Math.floor(count[3] / 2);
        let c3 = count[3] % 2;
        
        let c4 = Math.floor(rem2 / 2);
        let c2 = rem2 % 2;
        
        let c6 = 0;
        if (c2 === 1 && c3 === 1) {
            c2 = 0;
            c3 = 0;
            c6 = 1;
        }
        if (c3 === 1 && c4 === 1) {
            c2 = 1;
            c6 = 1;
            c3 = 0;
            c4 = 0;
        }
        
        res[8] = c8; res[9] = c9; res[4] = c4; res[2] = c2; res[3] = c3; res[6] = c6;
        return res;
    }

    function sumValues(countObj) {
        let sum = 0;
        for (const k in countObj) sum += countObj[k];
        return sum;
    }

    function construct(factors) {
        let s = "";
        for (let digit = 2; digit <= 9; digit++) {
            s += String(digit).repeat(factors[digit] || 0);
        }
        return s;
    }

    const minRequiredFactors = getFactorCount(primeCount);
    if (sumValues(minRequiredFactors) > num.length) {
        return construct(minRequiredFactors).padStart(sumValues(minRequiredFactors), '1');
    }

    const primeCountPrefix = { 2: 0, 3: 0, 5: 0, 7: 0 };
    for (let i = 0; i < num.length; i++) {
        const d = num.charCodeAt(i) - 48;
        if (d > 0) {
            for (const [p, freq] of Object.entries(kFactorCounts[d])) {
                primeCountPrefix[p] += freq;
            }
        }
    }

    let firstZeroIndex = num.indexOf('0');
    if (firstZeroIndex === -1) {
        let isSubset = true;
        for (const p of [2, 3, 5, 7]) {
            if (primeCountPrefix[p] < primeCount[p]) {
                isSubset = false;
                break;
            }
        }
        if (isSubset) return num;
        firstZeroIndex = num.length;
    }

    for (let i = num.length - 1; i >= 0; i--) {
        const d = num.charCodeAt(i) - 48;
        
        if (d > 0) {
            for (const [p, freq] of Object.entries(kFactorCounts[d])) {
                primeCountPrefix[p] -= freq;
            }
        }

        if (i > firstZeroIndex) continue;

        const spaceAfterThisDigit = num.length - 1 - i;

        for (let biggerDigit = d + 1; biggerDigit <= 9; biggerDigit++) {
            const neededPrimes = { 2: 0, 3: 0, 5: 0, 7: 0 };
            for (const p of [2, 3, 5, 7]) {
                const acquired = primeCountPrefix[p] + (kFactorCounts[biggerDigit][p] || 0);
                neededPrimes[p] = Math.max(0, primeCount[p] - acquired);
            }

            const factorsAfterReplacement = getFactorCount(neededPrimes);
            if (sumValues(factorsAfterReplacement) <= spaceAfterThisDigit) {
                const fillOnes = spaceAfterThisDigit - sumValues(factorsAfterReplacement);
                return num.substring(0, i) + 
                       biggerDigit + 
                       '1'.repeat(fillOnes) + 
                       construct(factorsAfterReplacement);
            }
        }
    }

    const finalNeededFactors = getFactorCount(primeCount);
    const onesCount = num.length + 1 - sumValues(finalNeededFactors);
    return '1'.repeat(onesCount) + construct(finalNeededFactors);
    
};
