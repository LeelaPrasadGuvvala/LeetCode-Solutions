/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    
    const MOD = 1000000007;
    const dp = new Array(26).fill(0);
    let total = 0;

    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i) - 97; // 'a' code is 97
        const diff = (total - dp[charCode] + 1 + MOD) % MOD;
        total = (total + diff) % MOD;
        dp[charCode] = (dp[charCode] + diff) % MOD;
    }

    return total;
    
};
