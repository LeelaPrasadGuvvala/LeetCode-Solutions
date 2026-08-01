/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    
    const l = nums.length;
    
    const predict = [...nums];
    
    for (let i = l - 2; i >= 0; i--) {
        for (let j = i + 1; j < l; j++) {
            predict[j] = Math.max(nums[i] - predict [j], nums[j] - predict[j - 1]);
        }
    }
    
    return predict[l - 1] >= 0;
};
