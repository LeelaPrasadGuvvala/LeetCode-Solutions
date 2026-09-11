/**
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function(digits) {
    
    const uniqueEvens = new Set();
    const n = digits.length;

    for (let i = 0; i < n; i++) {
        // A 3-digit number cannot have a leading zero
        if (digits[i] === 0) continue; 
        
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;
                
                // The number must be even (last digit must be even)
                if (digits[k] % 2 === 0) {
                    const num = digits[i] * 100 + digits[j] * 10 + digits[k];
                    uniqueEvens.add(num);
                }
            }
        }
    }

    return uniqueEvens.size;

};
