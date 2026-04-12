class GunShoot extends MovableObject {
    World;
    constructor(x, y, otherDirection, world) {
        super();
        this.loadImage('img/pinguin/TurbineFx/TurbineFx_00.png');
        this.x = x;
        this.y = y;
        this.width = 250;
        this.height = 170;
        this.otherDirection = otherDirection;
        this.World = world;
        this.shoot();
    }

    shoot() {
        this.speedY = 10;
        if (!this.World.isMuted()) {
            this.World.soundManager.play('shoot_sound');
        }
        this.stopShootInterval = setInterval(() => {
            this.x += this.otherDirection ? -10 : 10;
        }, 50);
    }

    stop() {
        clearInterval(this.stopShootInterval);
    }
}

class ThrowableObjectFish extends MovableObject {
    World;

    constructor(x, y, otherDirection, world) {
        super();
        this.loadImage('img/fish/Fish.svg');
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 100;
        this.otherDirection = otherDirection;
        this.World = world;
        this.throw();
    }

    throw () {
        this.speedY = 24;
        this.applyGravity();
        if (!this.World.isMuted()) {
            this.World.soundManager.play('throw_sound');
        }

        this.throwInterval = setInterval(() => {
            this.x += this.otherDirection ? -15 : 15;
        }, 30);

    }

    stop() {
        clearInterval(this.throwInterval);
    }
}