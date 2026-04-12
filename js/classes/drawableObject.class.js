/** Base class for all drawable game objects. */
class DrawableObject {

    /** Current image element. */
    img;

    /** Cache for preloaded images. */
    imageCache = {};

    /** Current animation frame index. */
    currentImage = 0;

    /** X position on canvas. */
    x = 0;

    /** Y position on canvas. */
    y = 100;

    /** Draws the object on the canvas. */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.warn('Image could not be loaded:', this.img.src);
        }
    }

    /** Loads a single image. */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /** Preloads multiple images into cache. */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /** Optional debug frame (collision box). */
    drawFrame(ctx) {
        // ctx.beginPath();
        // ctx.lineWidth = '5';
        // ctx.strokeStyle = 'blue';
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.stroke();
    }
}