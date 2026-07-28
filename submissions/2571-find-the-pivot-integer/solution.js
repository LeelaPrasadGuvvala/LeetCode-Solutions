/**
 * @param {number} n
 * @return {number}
 */
var pivotInteger = function(n) {
    if (1 <= n && n <= 1000) {
        if (n === 1) return 1;
        else {
            let pivot = -1;

            
            for (let x = 1; x <= n; x++) {
                let leftSum = 0;
                let rightSum = 0;

                for (let i = 1; i <= x; i++) {
                    leftSum += i;
                }

                for (let j = x; j <= n; j++) {
                    rightSum += j;
                }

                let difference = Math.abs(leftSum - rightSum);

                if (difference === 0) {
                    return x;
                }
            }

            return pivot;
        }
    } else return -1;
};
