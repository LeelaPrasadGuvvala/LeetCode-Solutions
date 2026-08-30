function minimumDeletions(nums: number[]): number {
    
    const n = nums.length;
    if (n <= 2) return n;

    let minIdx = 0;
    let maxIdx = 0;

    // 1. Find the indices of the minimum and maximum elements
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIdx]) minIdx = i;
        if (nums[i] > nums[maxIdx]) maxIdx = i;
    }

    // 2. Identify the smaller and larger index to simplify calculations
    const low = Math.min(minIdx, maxIdx);
    const high = Math.max(minIdx, maxIdx);

    // 3. Calculate costs for the three strategies
    const removeFromFront = high + 1;
    const removeFromBack = n - low;
    const removeFromBoth = (low + 1) + (n - high);

    // 4. Return the minimum of the three options
    return Math.min(removeFromFront, removeFromBack, removeFromBoth);
    
};
