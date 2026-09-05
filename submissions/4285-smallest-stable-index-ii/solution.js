/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    
    const n = nums.length;
    const rightMin = new Array(n);
    
    // Precompute minimum values from index i to n - 1
    rightMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMin[i] = Math.min(nums[i], rightMin[i + 1]);
    }
    
    let leftMax = -Infinity;
    
    // Traverse from front to back to find the first stable index
    for (let i = 0; i < n; i++) {
        leftMax = Math.max(leftMax, nums[i]);
        if (leftMax - rightMin[i] <= k) {
            return i;
        }
    }
    
    return -1;
    
};
