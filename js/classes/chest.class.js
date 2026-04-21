class chest extends MovableObject {

    IMAGES_OPEN_CHEST = [
        'img/chest/Chest-1.svg',
        'img/chest/Chest-2.svg',
        'img/chest/Chest-3.svg'
    ];

    width = 250;
    height = 210;
    currentImage = 0;
    World;

    /**
     * Creates a new chest instance.
     * Initializes position and loads images.
     */
    constructor() {
        super().loadImage('img/chest/Chest-1.svg');
        this.loadImages(this.IMAGES_OPEN_CHEST);
        this.y = 380;
        this.x = 7350;
    }

    /**
     * Stops the chest animation.
     * @returns {void}
     */
    stop() {
        clearInterval(this.chestInterval);
    }

    /**
     * Starts the chest opening animation.
     * @returns {void}
     */
    animate() {
        this.chestInterval = setInterval(() => {
            this.playWalkingAnimationImages(this.IMAGES_OPEN_CHEST);
        }, 400);
    }
}