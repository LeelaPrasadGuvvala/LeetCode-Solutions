/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubsequence = function(nums) {
    
    let totalXor = 0;
    let hasNonZero = false;
    
    for (const num of nums) {
        totalXor ^= num;
        if (num !== 0) {
            hasNonZero = true;
        }
    }
    
    if (!hasNonZero) {
        return 0;
    }
    
    if (totalXor !== 0) {
        return nums.length;
    }
    
    return nums.length - 1;
    
};
