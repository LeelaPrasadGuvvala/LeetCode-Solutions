/**
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean}
 */
var checkOverlap = function(radius, xCenter, yCenter, x1, y1, x2, y2) {
    
    // Find the closest x and y coordinates on the rectangle to the circle center
    const closestX = Math.max(x1, Math.min(x2, xCenter));
    const closestY = Math.max(y1, Math.min(y2, yCenter));

    // Calculate the distance vector components from circle center to this closest point
    const distanceX = xCenter - closestX;
    const distanceY = yCenter - closestY;

    // Compare the squared distance with the squared radius
    return (distanceX * distanceX + distanceY * distanceY) <= (radius * radius);

    
};
