/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    
   const n = s.length;
    const k = queryIndices.length;
    const ans = new Array(k);
    
    const treeMax = new Int32Array(4 * n);
    const treeLeftLen = new Int32Array(4 * n);
    const treeLeftChar = new Uint16Array(4 * n);
    const treeRightLen = new Int32Array(4 * n);
    const treeRightChar = new Uint16Array(4 * n);
    
    function pushUp(node, l, r) {
        const leftNode = 2 * node;
        const rightNode = 2 * node + 1;
        const mid = (l + r) >> 1;
        const leftCount = mid - l + 1;
        const rightCount = r - mid;
        
        treeLeftChar[node] = treeLeftChar[leftNode];
        treeLeftLen[node] = treeLeftLen[leftNode];
        if (treeLeftLen[leftNode] === leftCount && treeLeftChar[leftNode] === treeLeftChar[rightNode]) {
            treeLeftLen[node] = leftCount + treeLeftLen[rightNode];
        }
        
        treeRightChar[node] = treeRightChar[rightNode];
        treeRightLen[node] = treeRightLen[rightNode];
        if (treeRightLen[rightNode] === rightCount && treeRightChar[rightNode] === treeRightChar[leftNode]) {
            treeRightLen[node] = rightCount + treeRightLen[leftNode];
        }
        
        let maxVal = Math.max(treeMax[leftNode], treeMax[rightNode]);
        if (treeRightChar[leftNode] === treeLeftChar[rightNode]) {
            maxVal = Math.max(maxVal, treeRightLen[leftNode] + treeLeftLen[rightNode]);
        }
        treeMax[node] = maxVal;
    }
    
    function build(node, l, r) {
        if (l === r) {
            const code = s.charCodeAt(l);
            treeMax[node] = 1;
            treeLeftLen[node] = 1;
            treeLeftChar[node] = code;
            treeRightLen[node] = 1;
            treeRightChar[node] = code;
            return;
        }
        const mid = (l + r) >> 1;
        build(2 * node, l, mid);
        build(2 * node + 1, mid + 1, r);
        pushUp(node, l, r);
    }
    
    function update(node, l, r, idx, charCode) {
        if (l === r) {
            treeMax[node] = 1;
            treeLeftLen[node] = 1;
            treeLeftChar[node] = charCode;
            treeRightLen[node] = 1;
            treeRightChar[node] = charCode;
            return;
        }
        const mid = (l + r) >> 1;
        if (idx <= mid) {
            update(2 * node, l, mid, idx, charCode);
        } else {
            update(2 * node + 1, mid + 1, r, idx, charCode);
        }
        pushUp(node, l, r);
    }
    
    build(1, 0, n - 1);
    
    const sArr = s.split('');
    for (let i = 0; i < k; i++) {
        const idx = queryIndices[i];
        const char = queryCharacters[i];
        const charCode = queryCharacters.charCodeAt(i);
        if (sArr[idx] !== char) {
            sArr[idx] = char;
            update(1, 0, n - 1, idx, charCode);
        }
        ans[i] = treeMax[1];
    }
    
    return ans;
   
};
