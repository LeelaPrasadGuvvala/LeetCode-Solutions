function stoneGameV(stoneValue: number[]): number {
    const n: number = stoneValue.length;
    
    const prefixSums: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSums[i + 1] = prefixSums[i] + stoneValue[i];
    }
    
    const getSum = (i: number, j: number): number => prefixSums[j + 1] - prefixSums[i];
    
    const memo: number[][] = Array.from({ length: n }, () => new Array(n).fill(-1));
    
    function solve(i: number, j: number): number {
        if (i === j) return 0;
        if (memo[i][j] !== -1) return memo[i][j];
        
        let maxScore: number = 0;
        
        for (let k = i; k < j; k++) {
            const leftSum: number = getSum(i, k);
            const rightSum: number = getSum(k + 1, j);
            
            if (leftSum < rightSum) {
                maxScore = Math.max(maxScore, leftSum + solve(i, k));
            } else if (leftSum > rightSum) {
                maxScore = Math.max(maxScore, rightSum + solve(k + 1, j));
            } else {
                const chooseLeft: number = leftSum + solve(i, k);
                const chooseRight: number = rightSum + solve(k + 1, j);
                maxScore = Math.max(maxScore, chooseLeft, chooseRight);
            }
        }
        
        memo[i][j] = maxScore;
        return maxScore;
    }
    
    return solve(0, n - 1);
    
};
