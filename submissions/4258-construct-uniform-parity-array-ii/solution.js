/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {

    let minOdd = Infinity;
    let minEven = Infinity;

    for (const num of nums1) {
        if (num % 2 !== 0) {
            minOdd = Math.min(minOdd, num);
        } else {
            minEven = Math.min(minEven, num);
        }
    }

    // 1. Check if all can be EVEN:
    // This is only possible if there are NO odd numbers at all.
    if (minOdd === Infinity) {
        return true;
    }

    // 2. Check if all can be ODD:
    // Every even number must be strictly greater than the minimum odd number.
    // If minEven > minOdd, then ALL even numbers can subtract minOdd to become odd.
    if (minEven === Infinity || minEven > minOdd) {
        return true;
    }

    return false;
    
};
