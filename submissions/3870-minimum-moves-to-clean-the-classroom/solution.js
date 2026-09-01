/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    
    const m = classroom.length;
    const n = classroom[0].length;
    
    let startR = -1, startC = -1;
    const litterMap = new Map();
    let litterCount = 0;
    
    // Step 1: Locate 'S' and index all 'L' cells
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const char = classroom[r][c];
            if (char === 'S') {
                startR = r;
                startC = c;
            } else if (char === 'L') {
                litterMap.set(`${r},${c}`, litterCount++);
            }
        }
    }
    
    const fullMask = (1 << litterCount) - 1;
    
    // If there is no litter to collect
    if (fullMask === 0) return 0;
    
    // dist[r][c][mask] stores the maximum remaining energy seen for state (r, c, mask)
    const dist = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            new Int16Array(1 << litterCount).fill(-1)
        )
    );
    
    const queue = [];
    
    let initialMask = 0;
    let initialEnergy = energy;
    const startCell = classroom[startR][startC];
    
    if (startCell === 'L') {
        initialMask |= (1 << litterMap.get(`${startR},${startC}`));
    }
    if (startCell === 'R') {
        initialEnergy = energy;
    }
    
    queue.push([startR, startC, initialMask, initialEnergy, 0]);
    dist[startR][startC][initialMask] = initialEnergy;
    
    let head = 0;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (head < queue.length) {
        const [r, c, mask, e, steps] = queue[head++];
        
        if (mask === fullMask) {
            return steps;
        }
        
        // If current energy is 0 and we are not on 'R', we cannot move out from here
        if (e === 0 && classroom[r][c] !== 'R') {
            continue;
        }
        
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            // Check boundaries and obstacles
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || classroom[nr][nc] === 'X') {
                continue;
            }
            
            const cell = classroom[nr][nc];
            
            // Energy calculation
            let nextE = (cell === 'R') ? energy : e - 1;
            
            // If energy drops below 0, invalid move
            if (nextE < 0) {
                continue;
            }
            
            // Update mask if destination is 'L'
            let nextMask = mask;
            if (cell === 'L') {
                const litterIdx = litterMap.get(`${nr},${nc}`);
                nextMask |= (1 << litterIdx);
            }
            
            // Only proceed if this state provides strictly more remaining energy
            if (nextE > dist[nr][nc][nextMask]) {
                dist[nr][nc][nextMask] = nextE;
                queue.push([nr, nc, nextMask, nextE, steps + 1]);
            }
        }
    }
    
    return -1;

};
