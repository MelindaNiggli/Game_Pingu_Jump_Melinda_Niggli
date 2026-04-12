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

    constructor() {
        super().loadImage('img/chest/Chest-1.svg');
        this.loadImages(this.IMAGES_OPEN_CHEST);
        this.y = 380;
        this.x = 7350;
    }
    stop() {
        clearInterval(this.chestInterval);
    }

    animate() {
        this.chestInterval = setInterval(() => {
            this.playWalkingAnimationImages(this.IMAGES_OPEN_CHEST);
        }, 400);
    }


}