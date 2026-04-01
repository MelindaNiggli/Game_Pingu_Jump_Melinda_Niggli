class GunShoot extends MovableObject {
    shoot_sound = new Audio('audio/Shoot.mp3');
    World;

    IMAGES_TURBINE = [
        'img/pinguin/TurbineFx/TurbineFx_00.png',
        'img/pinguin/TurbineFx/TurbineFx_01.png',
        'img/pinguin/TurbineFx/TurbineFx_02.png',
        'img/pinguin/TurbineFx/TurbineFx_03.png',
        'img/pinguin/TurbineFx/TurbineFx_04.png',
        'img/pinguin/TurbineFx/TurbineFx_05.png',
        'img/pinguin/TurbineFx/TurbineFx_06.png',
        'img/pinguin/TurbineFx/TurbineFx_07.png',
        'img/pinguin/TurbineFx/TurbineFx_08.png',
        'img/pinguin/TurbineFx/TurbineFx_09.png'
    ];

    constructor(x, y, otherDirection, world) {
        super().loadImage('img/pinguin/TurbineFx/TurbineFx_00.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.World = world;
        this.shoot();
    }

    shoot() {
        this.speedY = 20;
        if (!this.World.isMuted()) {
            this.shoot_sound.play();
        }

        setInterval(() => {
            this.x += this.otherDirection ? -10 : 10;
        }, 50);
    }
}



class ThrowableObjectFish extends MovableObject {
    throw_sound = new Audio('audio/Throw.mp3');
    World;

    constructor(x, y, otherDirection, world) {
        super().loadImage('img/fish/Fish.svg');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 100;
        this.otherDirection = otherDirection;
        this.World = world;
        this.throw();
    }

    throw() {
        this.speedY = 25;
        if (!this.World.isMuted()) {
            this.throw_sound.play();
        }
        this.applyGravity();
        setInterval(() => {
            this.x += this.otherDirection ? -10 : 10;
        }, 50);
    }
}