/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function(root) {
    
    let resultCount = 0;

    function dfs(node) {
        if (!node) {
            return [0, 0];
        }

        // 1. Process left and right subtrees
        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        // 2. Compute total sum and count for current node's subtree
        const currentSum = leftSum + rightSum + node.val;
        const currentCount = leftCount + rightCount + 1;

        // 3. Check if subtree average (rounded down) equals node's value
        if (Math.floor(currentSum / currentCount) === node.val) {
            resultCount++;
        }

        // 4. Return subtree state to parent node
        return [currentSum, currentCount];
    }

    dfs(root);
    return resultCount;

};
