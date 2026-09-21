/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function(nums, k) {
    
    // ans[x] will store the number of subarrays whose product % k === x
    let ans = new Array(k).fill(0);
    
    // dp[r] tracks the count of active subarrays ending at the 
    // previous position with a product % k === r
    let dp = new Array(k).fill(0);
    
    for (let num of nums) {
        let newDp = new Array(k).fill(0);
        let numMod = num % k;
        
        // Choice 1: Start a completely fresh subarray consisting only of `num`
        newDp[numMod] = 1;
        
        // Choice 2: Extend all valid subarrays that ended at the previous number
        for (let i = 0; i < k; i++) {
            if (dp[i] > 0) {
                let newMod = (i * numMod) % k;
                newDp[newMod] += dp[i];
            }
        }
        
        // Accumulate the current step's subarray remainder counts into our final answer
        for (let i = 0; i < k; i++) {
            ans[i] += newDp[i];
        }
        
        // Move to the next element
        dp = newDp;
    }
    
    return ans;
    
};
