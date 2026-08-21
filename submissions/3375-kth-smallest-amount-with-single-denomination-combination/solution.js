/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {

    coins.sort((a, b) => a - b);
    let filtered = [];
    for (let c of coins) {
        let redundant = false;
        for (let f of filtered) {
            if (c % f === 0) {
                redundant = true;
                break;
            }
        }
        if (!redundant) filtered.push(c);
    }
    coins = filtered;
    let n = coins.length;

    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    function lcm(a, b) {
        return (a / gcd(a, b)) * b;
    }

    const m = 1 << n;
    const subLcms = new Float64Array(m);
    const subSizes = new Int8Array(m);

    for (let mask = 1; mask < m; mask++) {
        let bit = mask & -mask;
        let prev = mask ^ bit;
        let idx = 31 - Math.clz32(bit);
        
        if (prev === 0) {
            subLcms[mask] = coins[idx];
            subSizes[mask] = 1;
        } else {
            let nextLcm = lcm(subLcms[prev], coins[idx]);
            subLcms[mask] = nextLcm;
        }

        let countBits = 0;
        let tempMask = mask;
        while (tempMask > 0) {
            countBits += (tempMask & 1);
            tempMask >>= 1;
        }
        subSizes[mask] = countBits;
    }

    function count(mid) {
        let total = 0;
        for (let i = 1; i < m; i++) {
            let currentLcm = subLcms[i];
            if (currentLcm <= mid) {
                if (subSizes[i] % 2 === 1) {
                    total += Math.floor(mid / currentLcm);
                } else {
                    total -= Math.floor(mid / currentLcm);
                }
            }
        }
        return total;
    }

    let left = 1;
    let right = coins[0] * k;
    let ans = right;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (count(mid) >= k) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return ans;
    
};
