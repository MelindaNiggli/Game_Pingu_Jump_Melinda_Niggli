class BackgroundObject extends MovableObject {

    width = 1200;
    height = 690;

    /**
     * Creates a background object.
     * @param {string} imagePath - Path to the background image
     * @param {number} x - X position of the background
     * @param {number} y - Y position (ignored, y is calculated automatically)
     * @param {number} [width] - Optional width override
     * @param {number} [height] - Optional height override
     */
    constructor(imagePath, x, y, width, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 690 - this.height;
    }
}