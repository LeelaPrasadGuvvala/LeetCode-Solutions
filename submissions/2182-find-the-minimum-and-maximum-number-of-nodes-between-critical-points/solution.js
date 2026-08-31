/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {

    let minDistance = Infinity;
    let firstCriticalIndex = -1;
    let lastCriticalIndex = -1;
    
    let prev = head;
    let curr = head.next;
    let currentIndex = 1;
    
    while (curr && curr.next) {
        let nextVal = curr.next.val;
        
        // Check for local maxima or local minima
        if ((curr.val > prev.val && curr.val > nextVal) || 
            (curr.val < prev.val && curr.val < nextVal)) {
            
            if (lastCriticalIndex !== -1) {
                minDistance = Math.min(minDistance, currentIndex - lastCriticalIndex);
            } else {
                firstCriticalIndex = currentIndex;
            }
            lastCriticalIndex = currentIndex;
        }
        
        prev = curr;
        curr = curr.next;
        currentIndex++;
    }
    
    if (firstCriticalIndex === -1 || firstCriticalIndex === lastCriticalIndex) {
        return [-1, -1];
    }
    
    let maxDistance = lastCriticalIndex - firstCriticalIndex;
    return [minDistance, maxDistance];
    
};
