/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {

    let prefix = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            prefix += nums[i];
        } else {
            break;
        }
    }
    
    const seen = {};
    for (let i = 0; i < nums.length; i++) {
        seen[nums[i]] = true;
    }

    while (seen[prefix]) {
        prefix++;
    }
    
    return prefix;
};
