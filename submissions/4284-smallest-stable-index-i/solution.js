/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    
    const n = nums.length;
    if (n === 0) return -1;

    // Build suffix minimum array
    const minFromRight = new Array(n);
    minFromRight[n - 1] = nums[n - 1];
    
    for (let i = n - 2; i >= 0; i--) {
        minFromRight[i] = Math.min(nums[i], minFromRight[i + 1]);
    }

    // Traverse from left to right, maintaining running prefix max
    let maxSoFar = -Infinity;
    for (let i = 0; i < n; i++) {
        maxSoFar = Math.max(maxSoFar, nums[i]);
        
        if (maxSoFar - minFromRight[i] <= k) {
            return i;
        }
    }

    return -1;

};
