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
        this.World = world; // World speichern
        this.y = 100 + Math.random() * 200;
        this.x = 100 + Math.random() * 6500;
        this.width = 70;
        this.height = 70;
    }

    playSound() {
        if (!this.World.isMuted()) {
            this.World.soundManager.play('crystalSound');
        }
    }
}