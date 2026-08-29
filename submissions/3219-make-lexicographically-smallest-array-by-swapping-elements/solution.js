/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {

    const n = nums.length;

    // Step 1: Pair each element with its original index and sort by value
    const paired = nums.map((val, idx) => [val, idx]);
    paired.sort((a, b) => a[0] - b[0]);

    const result = new Array(n);
    let groupValues = [];
    let groupIndices = [];

    // Step 2: Identify connected components (groups)
    for (let i = 0; i < n; i++) {
        groupValues.push(paired[i][0]);
        groupIndices.push(paired[i][1]);

        // If it's the last element or the next value exceeds the limit constraint
        if (i === n - 1 || paired[i + 1][0] - paired[i][0] > limit) {
            // Sort indices to fill earliest positions first with smallest elements
            groupIndices.sort((a, b) => a - b);

            // Re-assign sorted values to sorted indices
            for (let j = 0; j < groupValues.length; j++) {
                result[groupIndices[j]] = groupValues[j];
            }

            // Reset buffers for the next group
            groupValues = [];
            groupIndices = [];
        }
    }

    return result;
    
};
