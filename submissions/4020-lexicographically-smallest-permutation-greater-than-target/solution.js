/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexGreaterPermutation = function(s, target) {

    const n = s.length;
    
    // Step 1: Count frequency of each character in s
    const counts = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        counts[s.charCodeAt(i) - 97]++;
    }
    
    // Step 2: Try to match target prefix as far as possible
    const tempCounts = [...counts];
    let matchedLength = 0;
    
    while (matchedLength < n) {
        const charIdx = target.charCodeAt(matchedLength) - 97;
        if (tempCounts[charIdx] > 0) {
            tempCounts[charIdx]--;
            matchedLength++;
        } else {
            break;
        }
    }
    
    // Helper function to build the result string once divergence index & char are found
    const buildResult = (divergenceIndex, chosenCharIdx) => {
        const res = [];
        
        // 1. Add matching prefix
        res.push(target.substring(0, divergenceIndex));
        
        // 2. Add the strictly larger character
        res.push(String.fromCharCode(97 + chosenCharIdx));
        tempCounts[chosenCharIdx]--;
        
        // 3. Append remaining available characters in sorted (ascending) order
        for (let c = 0; c < 26; c++) {
            while (tempCounts[c] > 0) {
                res.push(String.fromCharCode(97 + c));
                tempCounts[c]--;
            }
        }
        
        return res.join('');
    };

    // Step 3: Backtrack from matchedLength down to 0 to find the best divergence point
    for (let i = matchedLength; i >= 0; i--) {
        if (i < matchedLength) {
            // Restore target[i] back to available counts as we backtrack
            const charIdx = target.charCodeAt(i) - 97;
            tempCounts[charIdx]++;
        }
        
        // We need a character strictly greater than target[i]
        // If i === n, target[i] doesn't exist, but we can't diverge beyond index n-1 anyway
        if (i < n) {
            const targetCharIdx = target.charCodeAt(i) - 97;
            for (let c = targetCharIdx + 1; c < 26; c++) {
                if (tempCounts[c] > 0) {
                    return buildResult(i, c);
                }
            }
        }
    }
    
    return "";
    
};
