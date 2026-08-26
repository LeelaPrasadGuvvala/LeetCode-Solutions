/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var shortestBeautifulSubstring = function(s, k) {

    let minLen = Infinity;
    let res = "";
    
    // Step 1: Find the shortest length of a beautiful substring
    for (let i = 0; i < s.length; i++) {
        let count = 0;
        for (let j = i; j < s.length; j++) {
            if (s[j] === '1') count++;
            if (count === k) {
                let len = j - i + 1;
                if (len < minLen) {
                    minLen = len;
                    res = s.substring(i, j + 1);
                } else if (len === minLen) {
                    let candidate = s.substring(i, j + 1);
                    if (res === "" || candidate < res) {
                        res = candidate;
                    }
                }
                break; // No need to expand further for this starting index i
            }
        }
    }
    
    return res;
    
};
