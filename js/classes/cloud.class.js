class Cloud extends MovableObject {

    /**
     * Creates a new Cloud instance.
     * Initializes position, size, and starts movement animation.
     */
    constructor() {
        super().loadImage('img/backgrounds/02/layers/l3_clouds.png');
        this.y = 25;
        this.x = 700 + Math.random() * 8000;
        this.width = 1000;
        this.height = 600;
        this.animate();
    }

    /**
     * Stops the cloud movement.
     * @returns {void}
     */
    stopCloud() {
        clearInterval(this.cloudInterval);
    }

    /**
     * Starts the cloud movement animation.
     * @returns {void}
     */
    animate() {
        this.cloudInterval = setInterval(() => {
            this.moveLeft();
        }, 900 / 105);
    }
}