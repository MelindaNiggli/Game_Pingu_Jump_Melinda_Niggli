class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    energyEnemy = 100;
    energyEndboss = 100;
    hitCountEnemy = 0;
    hitCountEndboss = 0;
    haveStar = 0;
    haveCrystal = 0;
    isOnPlatform = false;
    lastHit = 0;
    isHurtwithCaracter = false;
    Keyboard;
    gravityIntervall = null;

    /**
     * Reduces enemy energy and increases hit counter.
     */
    hitEnemie() {
        this.energyEnemy -= 20;
        this.hitCountEnemy++;
        if (this.energyEnemy < 0) this.energyEnemy = 0;
    }

    /**
     * Checks if enemy is dead.
     */
    isEnemyDead() {
        return this.hitCountEnemy >= 1 || this.energyEnemy === 0;
    }

    /**
     * Checks if endboss is dead.
     */
    isEndbossDead() {
        if (this.hitCountEndboss === 8) {
            return this.energyEndboss === 0;
        }
    }

    /**
     * Applies damage to endboss from projectile.
     */
    hitGunEndboss() {
        this.energyEndboss -= 12.5;
        this.hitCountEndboss++;
    }

    /**
     * Applies damage to enemy from projectile.
     */
    hitGunEnemie() {
        this.hitCountEnemy++;
        if (this.energyEnemy < 0) this.energyEnemy = 0;
    }

    /**
     * Collects a star item.
     */
    hitStar() {
        this.haveStar = Math.min(this.haveStar + 5, 100);
    }

    /**
     * Collects a crystal item.
     */
    hitCrystal() {
        this.haveCrystal = Math.min(this.haveCrystal + 5, 100);
    }

    /**
     * Applies damage to the character.
     */
    hit() {
        if (!this.isHurtwithCaracter) {
            this.energy -= 2;

            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();

                if (!this.World.isMuted()) {
                    this.World.soundManager.play('characterhurtSound');
                }
            }
        }
    }

    /**
     * Checks if object is currently in hurt state.
     */
    isHurt() {
        return ((new Date().getTime() - this.lastHit) / 1000) < 0.20;
    }

    /**
     * Checks if object is dead.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Stops gravity interval.
     */
    stopIntervalGravity() {
        if (this.gravityIntervall) {
            clearInterval(this.gravityIntervall);
            this.gravityIntervall = null;
        }
    }

    /**
     * Applies gravity physics to object.
     */
    applyGravity() {
        if (this.gravityIntervall) return;

        this.gravityIntervall = setInterval(() => {
            if (this.isOnPlatform) {
                this.speedY = 0;
                return;
            }

            if (this.isinAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this.speedY < -20) this.speedY = -20;
            } else {
                this.speedY = 0;
                this.y = 420;
            }
        }, 1000 / 60);
    }

    /**
     * Makes object jump.
     */
    jump() {
        this.speedY = 42;
    }

    /**
     * Checks if object is above ground.
     */
    isinAboveGround() {
        return (this instanceof ThrowableObjectFish) ? true : this.y < 400;
    }

    /**
     * Plays animation frames in sequence.
     *
     * @param {Array<string>} images
     */
    playWalkingAnimationImages(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    /**
     * Moves object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks collision with another movable object.
     *
     * @param {MovableObject} mo
     */
    isColliding(mo) {
        return (this.x + this.width) >= mo.x &&
            this.x <= (mo.x + mo.width) &&
            (this.y + this.speedY + this.height) >= mo.y &&
            (this.y + this.speedY) <= (mo.y + mo.height);
    }

    /**
     * Checks collision with platforms.
     *
     * @param {Object} mo
     */
    isCollidingPlatform(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y + this.height < mo.y + mo.height;
    }

    /**
     * Resets object state to default values.
     */
    resetMovableObject() {
        this.speedY = 0;
        this.energy = 100;
        this.energyEnemy = 100;
        this.energyEndboss = 100;
        this.hitCountEnemy = 0;
        this.hitCountEndboss = 0;
        this.haveStar = 0;
        this.haveCrystal = 0;
        this.isOnPlatform = false;
        this.lastHit = 0;
        this.isHurtwithCaracter = false;
    }
}