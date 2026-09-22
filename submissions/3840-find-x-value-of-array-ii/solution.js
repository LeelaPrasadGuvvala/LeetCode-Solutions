class SegmentTreeNode {
    constructor(k) {
        this.prod = 1;
        this.remain = new Array(k).fill(0);
    }
}

class SegmentTree {
    constructor(nums, k) {
        this.n = nums.length;
        this.k = k;
        this.tree = Array.from({ length: 4 * this.n }, () => new SegmentTreeNode(k));
        this.build(nums, 0, 0, this.n - 1);
    }

    merge(left, right) {
        const parent = new SegmentTreeNode(this.k);
        parent.prod = (left.prod * right.prod) % this.k;

        // Copy all prefix remainders from the left child
        for (let i = 0; i < this.k; i++) {
            parent.remain[i] = left.remain[i];
        }

        // Add the shifted prefix remainders from the right child
        for (let i = 0; i < this.k; i++) {
            if (right.remain[i] > 0) {
                const shiftedIdx = (i * left.prod) % this.k;
                parent.remain[shiftedIdx] += right.remain[i];
            }
        }

        return parent;
    }

    build(nums, node, start, end) {
        if (start === end) {
            const val = nums[start] % this.k;
            this.tree[node].prod = val;
            this.tree[node].remain[val] = 1;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        this.build(nums, 2 * node + 1, start, mid);
        this.build(nums, 2 * node + 2, mid + 1, end);
        this.tree[node] = this.merge(this.tree[2 * node + 1], this.tree[2 * node + 2]);
    }

    update(node, start, end, idx, val) {
        if (start === end) {
            const rem = val % this.k;
            this.tree[node].prod = rem;
            this.tree[node].remain.fill(0);
            this.tree[node].remain[rem] = 1;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        if (idx <= mid) {
            this.update(2 * node + 1, start, mid, idx, val);
        } else {
            this.update(2 * node + 2, mid + 1, end, idx, val);
        }
        this.tree[node] = this.merge(this.tree[2 * node + 1], this.tree[2 * node + 2]);
    }

    query(node, start, end, l, r) {
        if (l <= start && end <= r) {
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        if (r <= mid) {
            return this.query(2 * node + 1, start, mid, l, r);
        }
        if (l > mid) {
            return this.query(2 * node + 2, mid + 1, end, l, r);
        }
        const leftResult = this.query(2 * node + 1, start, mid, l, mid);
        const rightResult = this.query(2 * node + 2, mid + 1, end, mid + 1, r);
        return this.merge(leftResult, rightResult);
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function(nums, k, queries) {
    
    const n = nums.length;
    const segTree = new SegmentTree(nums, k);
    const result = [];

    for (const [index, value, start, xi] of queries) {
        // Persistent point update
        segTree.update(0, 0, n - 1, index, value);
        
        // If start is beyond the final index, there are 0 valid prefixes
        if (start >= n) {
            result.push(0);
            continue;
        }

        // Query the range from `start` to `n - 1`
        const resNode = segTree.query(0, 0, n - 1, start, n - 1);
        result.push(resNode.remain[xi]);
    }

    return result;

};
