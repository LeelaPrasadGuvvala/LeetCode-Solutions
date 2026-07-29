/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const n1 = getReverseNumber(l1);
    const n2 = getReverseNumber(l2);
    const a = n1 + n2;
    //console.log(a.toString());
    const result = a.toString().split('').reverse().map(Number);
    //console.log(result);
    return arrayToList(result);
};

function getReverseNumber(list) {
    let s = [];
    let val = list;

    while (val !== null) {
        if (0 <= val.val && val.val <= 9) {
            s.push(val.val);
            val = val.next;
        } else {
            return 0;
        }
    }

    return BigInt(s.reverse().join(''));
}

function arrayToList(arr) {
    if (arr.length === 0) return null;
    let val = new ListNode(arr[0]);
    let c = val;

    for (let i = 1; i < arr.length; i++) {
        c.next = new ListNode(arr[i]);
        c = c.next;
    }

    return val;
}
