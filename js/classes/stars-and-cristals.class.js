class Star extends MovableObject {
    IMAGES_STAR = ['img/stars/star_10.png'];
    currentImage = 0;
    starSound = new Audio('audio/Star.mp3');
    World;

    constructor() {
        super().loadImage('img/stars/star_10.png');
        this.y = 420;
        this.x = 100 + Math.random() * 7000;
        this.width = 70;
        this.height = 70;
        this.loadImages(this.IMAGES_STAR);
    }

    playSound() {
        if (!this.World.isMuted()) {
            this.starSound.play();
        }
    }
}


class Crystal extends MovableObject {
    crystalSound = new Audio('audio/crystal.mp3');
    World;

    constructor(imagePath, world) {
        super().loadImage(imagePath);
        this.World = world; // World speichern
        this.y = 100 + Math.random() * 200;
        this.x = 100 + Math.random() * 7000;
        this.width = 100;
        this.height = 100;
    }

    playSound() {
        if (!this.World.isMuted()) {
            this.crystalSound.play();
        }
    }
}