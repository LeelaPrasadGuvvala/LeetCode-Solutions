/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {

    const n = stones.length;
    
    // Step 1: Compute prefix sums
    const prefix = new Array(n);
    prefix[0] = stones[0];
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + stones[i];
    }
    
    // Step 2: Initialize DP from the last possible move (taking all n stones)
    let res = prefix[n - 1];
    
    // Step 3: Iterate backward from n-2 down to 1
    for (let i = n - 2; i >= 1; i--) {
        res = Math.max(res, prefix[i] - res);
    }
    
    return res;
    
};
