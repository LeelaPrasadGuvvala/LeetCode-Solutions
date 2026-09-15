/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function(s, k) {

    const n = s.length;
    let count = 0;
    let lastEndedAt = -1; // Tracks the end index of the last selected palindrome

    // Helper function to expand around a center and look for valid palindromes
    function expand(left, right) {
        while (left >= 0 && right < n && s[left] === s[right]) {
            // Check if the current palindrome falls completely AFTER our last selected one
            if (left > lastEndedAt) {
                const len = right - left + 1;
                if (len >= k) {
                    count++;
                    lastEndedAt = right; // Greedily lock this palindrome
                    return true;         // Stop expanding this center, we found a valid one
                }
            } else {
                // If 'left' overlaps with our last selection, expanding further won't fix it
                break;
            }
            left--;
            right++;
        }
        return false;
    }

    for (let i = 0; i < n; i++) {
        // 1. Try odd-length palindromes centered at i
        if (expand(i, i)) continue; 
        
        // 2. Try even-length palindromes centered between i and i+1
        expand(i, i + 1);
    }

    return count;
    
};
