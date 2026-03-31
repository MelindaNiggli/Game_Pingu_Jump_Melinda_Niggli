class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    energyEnemy = 100;
    hitCountEnemy = 0;
    haveStar = 0;
    haveCrystal = 0;
    isOnPlatform = false;
    lastHit = 0;
    timepassed = 0;
    isHurtwithCaracter = false;
    Keyboard;

    hitEnemie() {
        this.energyEnemy -= 20;
        this.hitCountEnemy++; // Trefferanzahl erhöhen
        if (this.energyEnemy < 0) {
            this.energyEnemy = 0;
        }
    }

    isEnemyDead() {
        return this.hitCountEnemy >= 1 || this.energyEnemy === 0;
    }

    isEndbossDead() {
        return this.hitCountEnemy >= 8 || this.energyEnemy === 0;
    }

    hitGunEnemie() {
        this.energyEnemy = 0;
    }

    isColliding(mo) {
        return (this.x + this.width) >= mo.x &&
               this.x <= (mo.x + mo.width) &&
               (this.y + this.speedY + this.height) >= mo.y &&
               (this.y + this.speedY) <= (mo.y + mo.height);
    }

    isCollidingPlatform(mo) {
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x + mo.width && // Anpassung: x-Bereich der Plattform
               this.y + this.height < mo.y + mo.height; // nur Kollision von oben
    }

    hitStar() {
        this.haveStar += 5;
        if (this.haveStar > 100) {
            this.haveStar = 100;
        }
    }

    hitCrystal() {
        this.haveCrystal += 5;
        if (this.haveCrystal > 100) {
            this.haveCrystal = 100;
        }
    }

    hit() {
        if (!this.isHurtwithCaracter) {
            this.energy -= 1;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isHurt() {
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < 0.1;
    }

    isDead() {
        return this.energy === 0;
    }

    applyGravity() {
        setInterval(() => {
            if (!this.World?.isOnPlatform) {
                if (this.isinAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this.speedY < -20) this.speedY = -20;
                } else {
                    this.speedY = 0;
                    this.y = 420;
                }
            } else {
                this.speedY = 0;
                this.isOnPlatform = true;
            }
        }, 1000 / 60);
    }

    // JUMP
    jump() {
        this.speedY = 35;
    }

    // IS CHARACTER ABOVE GROUND 
    isinAboveGround() {
        if (this instanceof ThrowableObjectFish) {
            return true;
        } else {
            return this.y < 400;
        }
    }

    playWalkingAnimationImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}