/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function(n, k) {
    const MOD = 1_000_000_007;
    const totalPoints = n + k - 1;
    const chosen = 2 * k;
    
    return combination(totalPoints, chosen, MOD);
}

function combination(n, k, mod) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    
    k = Math.min(k, n - k);
    let numerator = 1n;
    let denominator = 1n;
    
    const BigMod = BigInt(mod);
    
    for (let i = 0n; i < BigInt(k); i++) {
        numerator = (numerator * (BigInt(n) - i)) % BigMod;
        denominator = (denominator * (i + 1n)) % BigMod;
    }
    
    return Number((numerator * modInverse(denominator, BigMod)) % BigMod);
}

function modInverse(a, m) {
    return power(a, m - 2n, m);
}

function power(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return res;
}

