/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexPalindromicPermutation = function(s, target) {
    
    const n = s.length;
    const m = Math.floor(n / 2);
    
    // Step 1: Count character frequencies
    const count = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        count[s.charCodeAt(i) - 97]++;
    }
    
    let oddCount = 0;
    let midChar = '';
    const halfCounts = new Array(26).fill(0);
    
    for (let i = 0; i < 26; i++) {
        if (count[i] % 2 !== 0) {
            oddCount++;
            midChar = String.fromCharCode(97 + i);
        }
        halfCounts[i] = Math.floor(count[i] / 2);
    }
    
    if (oddCount > 1) return "";

    let bestCandidate = null;

    // Helper to build full palindrome from first half
    function buildPalindrome(firstHalf) {
        let secondHalf = firstHalf.split('').reverse().join('');
        if (n % 2 !== 0) {
            return firstHalf + midChar + secondHalf;
        }
        return firstHalf + secondHalf;
    }

    // Helper to check if a frequency array can fulfill target prefix
    function canFormPrefix(prefix) {
        const tempCounts = [...halfCounts];
        for (let i = 0; i < prefix.length; i++) {
            const charIdx = prefix.charCodeAt(i) - 97;
            if (tempCounts[charIdx] <= 0) return null;
            tempCounts[charIdx]--;
        }
        return tempCounts;
    }

    // Try matching prefix of target up to index i
    for (let i = m; i >= 0; i--) {
        const prefix = target.slice(0, i);
        const remCounts = canFormPrefix(prefix);
        if (!remCounts) continue;

        if (i === m) {
            // Match entire first half
            const candidate = buildPalindrome(prefix);
            if (candidate > target) {
                if (!bestCandidate || candidate < bestCandidate) {
                    bestCandidate = candidate;
                }
            }
        } else {
            // Try picking a character greater than target[i]
            const targetCharIdx = target.charCodeAt(i) - 97;
            
            for (let c = targetCharIdx + 1; c < 26; c++) {
                if (remCounts[c] > 0) {
                    // Make a copy of remaining counts
                    const currCounts = [...remCounts];
                    currCounts[c]--;

                    // Build remainder of first half in smallest lexicographical order
                    let suffix = "";
                    for (let charCode = 0; charCode < 26; charCode++) {
                        suffix += String.fromCharCode(97 + charCode).repeat(currCounts[charCode]);
                    }

                    const firstHalf = prefix + String.fromCharCode(97 + c) + suffix;
                    const candidate = buildPalindrome(firstHalf);

                    if (candidate > target) {
                        if (!bestCandidate || candidate < bestCandidate) {
                            bestCandidate = candidate;
                        }
                    }
                    // Since we iterate c ascendingly, the first valid candidate at this prefix length
                    // gives the optimal choice for position i.
                    break;
                }
            }
        }
    }

    return bestCandidate || "";

};
