/**
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function(expression) {
    
    const uniqueStrings = new Set();
    
    const dfs = (exp) => {
        // Find the first closing brace
        const rightBrace = exp.indexOf('}');
        
        // Base case: No braces left, add the plain string to the set
        if (rightBrace === -1) {
            uniqueStrings.add(exp);
            return;
        }
        
        // Find the matching opening brace for this closing brace
        const leftBrace = exp.lastIndexOf('{', rightBrace);
        
        // Split the expression into three segments: before, inside braces, and after
        const before = exp.substring(0, leftBrace);
        const after = exp.substring(rightBrace + 1);
        const insideOptions = exp.substring(leftBrace + 1, rightBrace).split(',');
        
        // Recursively evaluate each inner combination
        for (const option of insideOptions) {
            dfs(before + option + after);
        }
    };
    
    dfs(expression);
    
    // Convert to array, sort lexicographically, and return
    return Array.from(uniqueStrings).sort();
    
};
