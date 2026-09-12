/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
var largestOverlap = function(img1, img2) {
    
    const n = img1.length;
    const list1 = [];
    const list2 = [];

    // Collect all coordinates of 1s in both images
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (img1[r][c] === 1) list1.push([r, c]);
            if (img2[r][c] === 1) list2.push([r, c]);
        }
    }

    const countMap = new Map();
    let maxOverlap = 0;

    // Calculate translation vectors for every pair of 1s
    for (const [r1, c1] of list1) {
        for (const [r2, c2] of list2) {
            const dr = r2 - r1;
            const dc = c2 - c1;
            const key = `${dr},${dc}`;
            
            const currentCount = (countMap.get(key) || 0) + 1;
            countMap.set(key, currentCount);
            maxOverlap = Math.max(maxOverlap, currentCount);
        }
    }

    return maxOverlap;

};
