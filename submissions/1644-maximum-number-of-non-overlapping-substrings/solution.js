/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    
    const n = s.length;
    const left = Array(26).fill(n);
    const right = Array(26).fill(-1);
    
    // Record first and last occurrence of each character
    for (let i = 0; i < n; ++i) {
        const code = s.charCodeAt(i) - 97;
        left[code] = Math.min(left[code], i);
        right[code] = i;
    }
    
    const res = [];
    let r = -1;
    
    for (let i = 0; i < n; ++i) {
        const code = s.charCodeAt(i) - 97;
        if (i === left[code]) {
            let new_r = right[code];
            let valid = true;
            
            // Expand the right boundary if characters within require it
            for (let j = i; j <= new_r; ++j) {
                const c = s.charCodeAt(j) - 97;
                if (left[c] < i) {
                    valid = false;
                    break;
                }
                new_r = Math.max(new_r, right[c]);
            }
            
            if (valid) {
                if (i > r) {
                    res.push("");
                }
                res[res.length - 1] = s.substring(i, new_r + 1);
                r = new_r;
            }
        }
    }
    
    return res;
    
};
