/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function(intervals) {
    
    const n = intervals.length;

    // Preserve original index: [l, r, weight, originalIndex]
    const items = new Array(n);
    for (let i = 0; i < n; i++) {
        items[i] = [intervals[i][0], intervals[i][1], intervals[i][2], i];
    }

    // Sort by start time (l)
    items.sort((a, b) => a[0] - b[0]);

    // Binary search to find the first interval starting strictly after rightBoundary
    function findFirstGreater(startFrom, rightBoundary) {
        let l = startFrom;
        let r = n;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (items[mid][0] > rightBoundary) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }

    // Helper to compare two index arrays lexicographically
    function compareLists(a, b) {
        const minLen = Math.min(a.length, b.length);
        for (let i = 0; i < minLen; i++) {
            if (a[i] !== b[i]) return a[i] - b[i];
        }
        return a.length - b.length;
    }

    // DP Memoization table: memo[i][quota] = { weight, selected }
    const memo = Array.from({ length: n }, () => new Array(5).fill(null));

    function dp(i, quota) {
        if (i === n || quota === 0) {
            return { weight: 0, selected: [] };
        }

        if (memo[i][quota] !== null) {
            return memo[i][quota];
        }

        // Option 1: Skip current interval
        const skip = dp(i + 1, quota);

        // Option 2: Pick current interval
        const [_, r, weight, origIndex] = items[i];
        const nextIdx = findFirstGreater(i + 1, r);
        const nextRes = dp(nextIdx, quota - 1);

        const pickSelected = [origIndex, ...nextRes.selected].sort((a, b) => a - b);
        const pick = {
            weight: weight + nextRes.weight,
            selected: pickSelected
        };

        // Select optimal choice (maximize weight, then lexicographically smallest indices)
        let res;
        if (pick.weight > skip.weight) {
            res = pick;
        } else if (pick.weight < skip.weight) {
            res = skip;
        } else {
            // Equal weights: choose lexicographically smaller index array
            res = compareLists(pick.selected, skip.selected) < 0 ? pick : skip;
        }

        memo[i][quota] = res;
        return res;
    }

    return dp(0, 4).selected;

};
