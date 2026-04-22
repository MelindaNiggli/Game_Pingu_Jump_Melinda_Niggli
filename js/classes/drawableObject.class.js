class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 100;
    percentage = 0;
    THRESHOLDS = [];
    directIndex = false;

    /**
     * Draws the object on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Rendering context of the canvas
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.warn('Image could not be loaded:', this.img.src);
        }
    }

    /**
     * Loads a single image.
     *
     * @param {string} path - Path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images into cache.
     *
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


  /**
 * Sets the percentage value and updates the displayed image.
 * @param {number} percentage - The current value (0–100 or direct index)
 */
setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resoloveImagesIndex()];
    this.img = this.imageCache[path];
}

/**
 * Resolves the correct image index based on the current percentage (STATUSBARS).
 * Uses direct index mapping if directIndex is true,
 * otherwise compares against THRESHOLDS array.
 * @returns {number} The resolved image index
 */
resoloveImagesIndex() {
    if (this.directIndex) return this.percentage;
    for (let [threshold, index] of this.THRESHOLDS) {
        if (this.percentage >= threshold) return index;
    }
    return 0;
}


        // /**
    //  * Optional debug frame (collision box).
    //  *
    //  * @param {CanvasRenderingContext2D} ctx - Rendering context of the canvas
    //  */
    // drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '5';
    //     ctx.strokeStyle = 'blue';
    //     ctx.rect(this.x, this.y, this.width, this.height);
    //     ctx.stroke();
    // }
}