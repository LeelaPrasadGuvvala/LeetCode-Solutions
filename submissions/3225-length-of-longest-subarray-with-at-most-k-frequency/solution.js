/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {

    const counts = new Map();
    let left = 0;
    let maxLength = 0;
    const n = nums.length;

    for (let right = 0; right < n; right++) {
        const val = nums[right];
        const freq = (counts.get(val) || 0) + 1;
        counts.set(val, freq);

        while (counts.get(val) > k) {
            const leftVal = nums[left];
            counts.set(leftVal, counts.get(leftVal) - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;

};
