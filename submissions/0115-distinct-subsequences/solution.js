/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    
    const m = s.length;
    const n = t.length;
    
    // dp[j] represents the number of distinct subsequences of s[0..i-1] 
    // that equal t[0..j-1]
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1; // Base case: an empty string t has 1 match
    
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] += dp[j - 1];
            }
        }
    }
    
    return dp[n];
    
};
