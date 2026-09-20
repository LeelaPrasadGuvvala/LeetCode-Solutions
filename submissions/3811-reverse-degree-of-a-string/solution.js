/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function(s) {
    
    let totalDegree = 0;
    
    for (let i = 0; i < s.length; i++) {
        // Calculate position in the reversed alphabet ('a' = 26, 'b' = 25, ..., 'z' = 1)
        const reversedAlphabetPos = 26 - (s.charCodeAt(i) - 97);
        
        // String is 1-indexed, so its position is (i + 1)
        const stringPos = i + 1;
        
        // Add the product to the total sum
        totalDegree += reversedAlphabetPos * stringPos;
    }
    
    return totalDegree;
    
};
