/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const l = word.length;
    if (l < 1 ||l > 100000) return 0;
    
    // Get frequency of char from given word
    let freq = {};
    for (let i = 0; i < l; i++) {
        const char = word[i];
        freq[char] = (freq[char] || 0) + 1;
    }

    // Sort char
    const keys = Object.keys(freq);

    keys.sort((a, b) => freq[b] - freq[a]);

    let c = 0;
    for (let j = 0; j < keys.length; j++) {
        c += freq[keys[j]] * (Math.floor(j / 8) + 1);
    };

    return c;
};
