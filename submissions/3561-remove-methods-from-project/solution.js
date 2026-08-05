/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    const graph = Array.from({ length: n }, () => []);
    
    for (const [u, v] of invocations) {
        graph[u].push(v);
    }
    
    const suspicious = new Uint8Array(n);
    const queue = [k];
    suspicious[k] = 1;
    
    while (queue.length > 0) {
        const u = queue.shift();
        for (const v of graph[u]) {
            if (!suspicious[v]) {
                suspicious[v] = 1;
                queue.push(v);
            }
        }
    }
    
    for (let u = 0; u < n; u++) {
        if (!suspicious[u]) {
            for (const v of graph[u]) {
                if (suspicious[v]) {
                    // return all methods if rule breaks
                    const result = [];
                    for (let i = 0; i < n; i++) result.push(i);
                    return result;
                }
            }
        }
    }
    
    const result = [];
    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) {
            result.push(i);
        }
    }
    
    return result;
};
