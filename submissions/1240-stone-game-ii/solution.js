/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    
    const n = piles.length;
    if (n === 0) return 0;

    const suffixSum = new Int32Array(n + 1);
    for (let i = n - 1; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + piles[i];
    }

    const dp = Array.from({ length: n + 1 }, () => new Int32Array(n + 1));

    for (let i = n - 1; i >= 0; i--) {
        for (let M = 1; M <= n; M++) {
            if (i + 2 * M >= n) {
                dp[i][M] = suffixSum[i];
                continue;
            }

            let maxStones = 0;
            const limit = 2 * M;
            for (let X = 1; X <= limit; X++) {
                const nextM = M > X ? M : X; 
                const currentChoice = suffixSum[i] - dp[i + X][nextM];
                
                if (currentChoice > maxStones) {
                    maxStones = currentChoice;
                }
            }
            dp[i][M] = maxStones;
        }
    }

    return dp[0][1];
    
};
