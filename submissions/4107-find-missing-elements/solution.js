/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    let min = 101, max = 0;
    const existed = [];

    for (let i = 0; i < nums.length; i++) {
        let val = nums[i];
        existed[val] = 1;
        if (val < min) min = val;
        if (val > max) max = val;
    }

    const missing = [];
    for (let i = min; i <= max; i++) {
        if (!existed[i]) {
            missing.push(i);
        }
    }
    return missing;
};
