/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {

    const rowMap = new Map();

    for (let i = 0, len = reservedSeats.length; i < len; i++) {
        const row = reservedSeats[i][0];
        const seat = reservedSeats[i][1];
        
        let mask = rowMap.get(row) || 0;
        rowMap.set(row, mask | (1 << seat));
    }

    let totalGroups = (n - rowMap.size) * 2;

    const leftMask = 60;    // seats 2, 3, 4, 5
    const rightMask = 960;  // seats 6, 7, 8, 9
    const middleMask = 240; // seats 4, 5, 6, 7

    for (let mask of rowMap.values()) {
        const leftFree = (mask & leftMask) === 0;
        const rightFree = (mask & rightMask) === 0;
        const middleFree = (mask & middleMask) === 0;
        
        if (leftFree && rightFree) {
            totalGroups += 2;
        } else if (leftFree || rightFree || middleFree) {
            totalGroups += 1;
        }
    }
    
    return totalGroups;
    
};
