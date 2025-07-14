/** @typedef {{ x: number, y: number, width: number, height: number }} Box */
/** @typedef {{ cx: number, cy: number, radius: number }} Circle */

/**
 * Collision detection helper functions
 */
class Collision {
    /**
     * Check if two rectangles collide
     * @param {Box} rect1 - first rectangle
     * @param {Box} rect2 - second rectangle
     * @returns {boolean} true if the rectangles collide, false otherwise
     */
    static box(rect1, rect2) {
        return !(rect1.x > rect2.x + rect2.width ||
            rect1.x + rect1.width < rect2.x ||
            rect1.y > rect2.y + rect2.height ||
            rect1.y + rect1.height < rect2.y);
    }

    /**
     * Check if two circles collide
     * @param {Circle} circle1 - first circle
     * @param {Circle} circle2 - second circle
     * @returns {boolean} true if the circles collide, false otherwise
     */
    static circle(circle1, circle2) {
        return Math.pow(circle1.cx - circle2.cx, 2) + Math.pow(circle1.cy - circle2.cy, 2) <= Math.pow(circle1.radius + circle2.radius, 2);
    }
}

export default Collision;