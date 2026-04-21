class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 100;

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
     * Optional debug frame (collision box).
     *
     * @param {CanvasRenderingContext2D} ctx - Rendering context of the canvas
     */
    drawFrame(ctx) {
        // ctx.beginPath();
        // ctx.lineWidth = '5';
        // ctx.strokeStyle = 'blue';
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.stroke();
    }
}