/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function(stoneValue) {
    const l = stoneValue.length;

    let p1 = 0, p2 = 0, p3 = 0;

    for (let i = l - 1; i >= 0; i--) {
        let take = 0;
        let adv = -Infinity;

        if (i < l) {
            take += stoneValue[i];
            adv = Math.max(adv, take - p1);
        }

        if (i + 1 < l) {
            take += stoneValue[i + 1];
            adv = Math.max(adv, take - p2);
        }

        if (i + 2 < l) {
            take += stoneValue[i + 2];
            adv = Math.max(adv, take - p3);
        }

        p3 = p2;
        p2 = p1;
        p1 = adv;

    }

    if (p1 > 0) return 'Alice';
    if (p1 < 0) return 'Bob';
    return 'Tie';
};
