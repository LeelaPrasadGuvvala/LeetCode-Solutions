/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    
    const n = arr.length;
    
    // minLens[i] stores the minimum length of a target subarray found in arr[0...i]
    const minLens = new Array(n).fill(Infinity);
    
    let ans = Infinity;
    let windowSum = 0;
    let left = 0;
    
    for (let right = 0; right < n; right++) {
        windowSum += arr[right];
        
        // Shrink the window if the sum exceeds target
        while (windowSum > target && left <= right) {
            windowSum -= arr[left];
            left++;
        }
        
        // When we find a subarray that matches the target
        if (windowSum === target) {
            const currentLen = right - left + 1;
            
            // If a valid non-overlapping target subarray exists before the current 'left' index,
            // we can combine them to form a candidate answer.
            if (left > 0 && minLens[left - 1] !== Infinity) {
                ans = Math.min(ans, minLens[left - 1] + currentLen);
            }
            
            // Record the minimum target subarray length ending at or before 'right'
            minLens[right] = currentLen;
        }
        
        // Carry forward the previous minimum length to maintain the prefix minimum properties
        if (right > 0) {
            minLens[right] = Math.min(minLens[right], minLens[right - 1]);
        }
    }
    
    return ans === Infinity ? -1 : ans;
    
};
