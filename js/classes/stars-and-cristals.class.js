class Star extends MovableObject {
    IMAGES_STAR = ['img/stars/star_10.png'];
    currentImage = 0;
    World;

    constructor() {
        super().loadImage('img/stars/star_10.png');
        this.y = 420;
        this.x = 100 + Math.random() * 6500;
        this.width = 70;
        this.height = 70;
        this.loadImages(this.IMAGES_STAR);
    }

    /**
     * Plays the star collection sound effect if sound is enabled.
     * @returns {void}
     */
    playSound() {
        if (!this.World.isMuted()) {
            this.World.soundManager.play('starSound');
        }
    }
}

class Crystal extends MovableObject {
    World;

    constructor(imagePath, world) {
        super().loadImage(imagePath);
        this.World = world;
        this.y = 100 + Math.random() * 200;
        this.x = 100 + Math.random() * 6500;
        this.width = 70;
        this.height = 70;
    }

    /**
     * Plays the crystal collection sound effect if sound is enabled.
     * @returns {void}
     */
    playSound() {
        if (!this.World.isMuted()) {
            this.World.soundManager.play('crystalSound');
        }
    }
}