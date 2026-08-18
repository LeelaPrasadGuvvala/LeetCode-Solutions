/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    
    const n = nums.length;
    
    if (k === n) {
        let maxVal = -1;
        for (let i = 0; i < n; i++) {
            if (nums[i] > maxVal) {
                maxVal = nums[i];
            }
        }
        return maxVal;
    }
    
    if (k === 1) {
        const counts = new Map();
        for (const num of nums) {
            counts.set(num, (counts.get(num) || 0) + 1);
        }
        
        let maxVal = -1;
        for (const [num, count] of counts.entries()) {
            if (count === 1 && num > maxVal) {
                maxVal = num;
            }
        }
        return maxVal;
    }
    
    const first = nums[0];
    const last = nums[n - 1];
    
    let firstCount = 0;
    let lastCount = 0;
    
    for (const num of nums) {
        if (num === first) firstCount++;
        if (num === last) lastCount++;
    }
    
    let ans = -1;
    if (firstCount === 1) {
        ans = Math.max(ans, first);
    }
    if (lastCount === 1) {
        ans = Math.max(ans, last);
    }
    
    return ans;    
};
