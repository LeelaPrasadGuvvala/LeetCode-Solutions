/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
    
    const n = word1.length;
    const m = word2.length;

    const lastMatch = new Array(m).fill(-1);
    
    let i = n - 1;
    let j = m - 1;
    
    while (i >= 0 && j >= 0) {
        if (word1[i] === word2[j]) {
            lastMatch[j] = i;
            j--;
        }
        i--;
    }
    
    const ans = [];
    let canSkip = true;
    j = 0;
    
    for (i = 0; i < n; i++) {
        if (j === m) break;
        if (word1[i] === word2[j]) {
            ans.push(i);
            j++;
        }

        else if (canSkip && (j === m - 1 || lastMatch[j + 1] > i)) {
            ans.push(i);
            canSkip = false;
            j++;
        }
    }
    
    return ans.length === m ? ans : [];
    
};
