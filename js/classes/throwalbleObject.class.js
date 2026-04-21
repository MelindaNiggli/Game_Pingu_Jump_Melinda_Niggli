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

    /**
     * Starts the shooting movement, applies forward motion and plays sound.
     * Moves the projectile continuously until stopped.
     */
    shoot() {
        this.speedX = this.otherDirection ? -12 : 12;
        const startX = this.x;

        this.moveInterval = setInterval(() => {
            this.x += this.speedX;
            const distanceTravelled = Math.abs(this.x - startX);
            if (distanceTravelled > 1200) {
                const index = this.World.GunShoot.indexOf(this);
                if (index > -1) { this.World.GunShoot.splice(index, 1); }
                clearInterval(this.moveInterval);
            }
        }, 40);
    }

    /**
     * Stops the projectile movement interval.
     */
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

    /**
     * Throws the fish projectile with gravity and horizontal movement.
     * Plays throw sound and applies physics.
     */

    throw () {
        this.speedY = 24;
        this.speedX = this.otherDirection ? -8 : 8;
        this.applyGravity();
        if (!this.World.isMuted()) {
            this.World.soundManager.play('throw_sound');
        }
        this.moveInterval = setInterval(() => {
            this.x += this.speedX;
        }, 1000 / 60);
    }

    /**
     * Stops the fish movement interval.
     */
    stop() {
        clearInterval(this.throwInterval);
    }
}