class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    isOnPlatform = false;

    statusBar = new StatusBar();
    statusBarStar = new StatusBarStar();
    statusBarCrystal = new StatusBarCrystal();
    statusBarFish = new StatusBarFish();
    statusBarGun = new StatusBarGun();
    StatusBarEndBoss = new StatusBarEndBoss();

    gameOver = new gameOver();
    gameWin = new gameWin();

    soundManager = new SoundManager();

    gameWinShowStar = new gameWinShowStar();
    gameWinShowCrystal = new gameWinShowCrystal();

    GunShoot = [];
    GunShootL = [];
    ThrowableObjects = [];
    ThrowableObjectsL = [];

    endbossTriggerX = 5000;
    endbossStopX = 5500;

    gameEnd = false;
    gameLost = false;
    gameWIN = false;
    deadEndboss = false;

    Keyboard = new Keyboard();

    intervalIds = [];
    requestId;

    lastShootTime = 0;
    lastThrowTime = 0;
    shootCooldown = 400;
    throwCooldown = 500;

    /**
     * Main render loop. Draws all world elements including background,
     * entities, UI elements, and game state overlays.
     */
    drawWorld() {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.platform);
        this.addObjectsToMap(this.level.chest);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.stars);
        this.addObjectsToMap(this.level.crystal);
        this.addObjectsToMap(this.ThrowableObjects);
        this.addObjectsToMap(this.GunShoot);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarStar);
        this.addToMap(this.statusBarCrystal);
        this.addToMap(this.statusBarFish);
        this.addToMap(this.statusBarGun);
        this.addToMap(this.StatusBarEndBoss);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        if (this.gameEnd) this.addToMap(this.gameOver);
        if (this.gameWIN) this.addToMap(this.gameWin);

        this.addToMap(this.gameWinShowStar);
        this.addToMap(this.gameWinShowCrystal);

        this.requestId = requestAnimationFrame(() => this.drawWorld());
    }

    /** Stops the render loop. */
    stopDraw() {
        this.isRunning = false;
        cancelAnimationFrame(this.requestId);
    }

    /**
     * Adds multiple objects to the canvas.
     * @param {Array} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Draws a single movable object and handles direction flipping.
     * @param {Object} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Flips an object horizontally before rendering.
     * @param {Object} mo
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores object orientation after rendering.
     * @param {Object} mo
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Returns whether sound is muted.
     * @returns {boolean}
     */
    isMuted() {
        return this.soundManager.isMuted();
    }

    /**
     * Creates a new world instance and starts the game systems.
     * @param {HTMLCanvasElement} canvas
     * @param {Keyboard} keyboard
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.start();
        this.setWorld();

        const isNotMutedBegin = localStorage.getItem("muted") === "false";
        if (isNotMutedBegin) {
            this.soundManager.playMusic();
        }

        this.level.enemies.forEach(enemy => enemy.animate());

        this.interval = setInterval(() => {
            this.CheckColisionsAndThrowObjects();
            this.CheckThrow();
        }, 200);

        this.interval2 = setInterval(() => {
            this.CheckThrow();
        }, 100);

        this.interval3 = setInterval(() => {
            this.checkCollisionPlatform();
        }, 1000 / 60);
    }

    /** Starts the game loop. */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.drawWorld();
    }

    /** Starts background music if sound is enabled. */
    startBackgroundMusic() {
        if (!this.isMuted()) {
            this.soundManager.playMusic();
        }
    }

    /** Handles periodic game checks for shooting and throwing objects. */
    CheckThrow() {
        this.checkThrowObjects();
        this.checkGunShoot();
    }

    /** Resets the game state and reinitializes all systems.*/
    resetGame() {
        this.stopDraw();
        this.clearIntervallAndStopBackgroundMusic();

        this.GunShoot = [];
        this.GunShootL = [];
        this.ThrowableObjectsL = [];
        this.ThrowableObjects = [];

        this.gameWIN = false;
        this.gameEnd = false;
        this.deadEndboss = false;

        this.gameWinSoundPlayed = false;
        this.gameOverSoundPlayed = false;

        this.gameWinShowStar = new gameWinShowStar();
        this.gameWinShowCrystal = new gameWinShowCrystal();

        if (this.character) this.character.stop();

        this.character = new Character();

        initLevel();
        this.level = level1;

        this.statusBar = new StatusBar();
        this.statusBarStar = new StatusBarStar();
        this.statusBarCrystal = new StatusBarCrystal();
        this.statusBarFish = new StatusBarFish();
        this.statusBarGun = new StatusBarGun();
        this.StatusBarEndBoss = new StatusBarEndBoss();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        initLevel();
        this.setWorld();
        this.start();

        this.level.enemies.forEach(enemy => enemy.animate());

        this.interval = setInterval(() => {
            this.CheckColisionsAndThrowObjects();
            this.CheckThrow();
        }, 200);

        this.intervalThrow = setInterval(() => {
            this.CheckThrow();
        }, 100);

        this.intervalPlatform = setInterval(() => {
            this.checkCollisionPlatform();
        }, 1000 / 60);
    }

    /** Stops all intervals, sound, and running game systems.*/
    clearIntervallAndStopBackgroundMusic() {
        this.soundManager.reset();

        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];

        this.clearAllChestIntervalls();
        this.clearAllIntervallCharacter();

        this.character.stopIntervalGravity();
        this.character.resetMovableObject();

        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        if (this.intervalThrow) {
            clearInterval(this.intervalThrow);
            this.intervalThrow = null;
        }

        if (this.intervalPlatform) {
            clearInterval(this.intervalPlatform);
            this.intervalPlatform = null;
        }

        if (this.level && this.level.clouds) {
            this.level.clouds.forEach(cloud => {
                if (cloud.stopCloud) cloud.stopCloud();
            });
        }

        this.GunShoot.forEach(shoot => shoot.stop());
        this.GunShootL.forEach(shoot => shoot.stop());
        this.ThrowableObjects.forEach(obj => obj.stop());
        this.ThrowableObjectsL.forEach(obj => obj.stop());

        this.GunShoot = [];
        this.GunShootL = [];
        this.ThrowableObjects = [];
        this.ThrowableObjectsL = [];

        if (this.level && this.level.endboss) {
            this.level.endboss.forEach(endboss => {
                endboss.World = this;
                if (endboss.stop) endboss.stop();
            });
        }

        if (this.level && this.level.enemies) {
            this.level.enemies.forEach(enemy => {
                enemy.World = this;
                if (enemy.stop) enemy.stop();
            });
        }

        this.gameWinSoundPlayed = false;

        this.soundManager.reset();

        if (!this.soundManager.isMuted()) {
            this.soundManager.playMusic('backgroundMusic');
        }
    }

    /** Runs all collision and game state checks. */
    CheckColisionsAndThrowObjects() {
        if (this.gameEnd || this.gameWIN) return;

        this.checkColisionCharacterWithEnemy();
        this.chekColisionsWithEndboss();
        this.checkColisionCharacterWithStar();
        this.checkColisionCharacterWithCrystal();
        this.checkColisionWithChest();
        this.checkCollisionFishWithEnemy();
        this.checkCollisionGunshootWithEnemy();
        this.checkGameWinHaveStarOreCrystal();
        this.checkColisionsCharacterFallDownOnEnemy();
        this.gameOverWhenMaxWeapons();
    }

    /** Stops all enemy-related intervals.*/
    clearAllEnemiesIntervalls() {
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach(enemy => {
                if (enemy.stop) enemy.stop();
            });
        }
    }

    /** Stops all chest-related intervals.*/
    clearAllChestIntervalls() {
        this.level.chest.forEach(chest => {
            if (chest.stop) chest.stop();
        });
    }

    /**  Stops character-related intervals. */
    clearAllIntervallCharacter() {
        this.character.stop();
    }

    /** Ends the game if the weapon limit is reached.*/
    gameOverWhenMaxWeapons() {
        if (
            this.GunShootL.length >= 13 &&
            this.ThrowableObjectsL.length >= 13 &&
            !this.gameEnd
        ) {
            this.gameEnd = true;
            this.soundManager.stopMusic();
            this.soundManager.stopEndbossMusic();

            if (!this.isMuted()) {
                this.soundManager.play('gameOverSound');
            }
        }
    }

    /** Links the character to the world instance.*/
    setWorld() {
        this.character.World = this;
    }

    /** Stops all background music.*/
    stopBackgroundMusic() {
        this.soundManager.stopMusic();
        this.soundManager.stopEndbossMusic();
    }

    /** Checks if the character has died and triggers game over state. */
    checkGameEndAfterCharacterDead() {
        if (this.character.gameEnd) {
            this.gameEnd = true;
            this.stopBackgroundMusic();
            if (!this.isMuted()) {
                this.soundManager.play('gameOverSound');
            }
        }
    }

    /** Handles game win logic and plays win sound once. */
    checkGameWIN() {
        if (this.gameWIN && !this.gameWinSoundPlayed) {
            this.gameWinSoundPlayed = true;
            this.stopBackgroundMusic();
            if (!this.isMuted()) {
                this.soundManager.play('winSound');
            }
        }
    }

    /** Updates win UI for stars and crystals. */
    checkGameWinHaveStarOreCrystal() {
        this.gameWinShowStar.check(this.gameWIN, this.character.haveStar);
        this.gameWinShowCrystal.checkNow(this.gameWIN, this.character.haveCrystal);
    }

    /** Handles fish throwing input with cooldown and limit. */
    checkThrowObjects() {
        let now = Date.now();

        if (
            this.ThrowableObjectsL.length < 13 &&
            this.keyboard.D &&
            now - this.lastThrowTime > this.throwCooldown
        ) {
            this.lastThrowTime = now;

            let fish;

            if (this.character.otherDirection) {
                fish = new ThrowableObjectFish(this.character.x - 80, this.character.y - 5, true, this);
            } else {
                fish = new ThrowableObjectFish(this.character.x + 80, this.character.y - 5, false, this);
            }

            this.ThrowableObjects.push(fish);
            this.ThrowableObjectsL.push(fish);
            this.statusBarFish.setPercentage(this.ThrowableObjectsL.length);

            this.soundManager.play('throw_sound');
        }
    }

    /** Handles shooting input with cooldown and limit. */
    shootOnlyKeydownS() {
        let now = Date.now();

        if (
            this.GunShootL.length < 13 &&
            this.keyboard.S &&
            now - this.lastShootTime > this.shootCooldown
        ) {
            this.lastShootTime = now;

            let shoot;

            if (this.character.otherDirection) {
                shoot = new GunShoot(this.character.x - 140, this.character.y + 16, true, this);
            } else {
                shoot = new GunShoot(this.character.x + 140, this.character.y + 16, false, this);
            }

            this.GunShoot.push(shoot);
            this.GunShootL.push(shoot);
            this.statusBarGun.setPercentage(this.GunShootL.length);

            this.removeShootFromGunshoot(shoot);

            this.soundManager.play('shoot_sound');
        }
    }

    /** Checks if shooting is allowed. */
    checkGunShoot() {
        if (!this.keyboard) return;
        this.shootOnlyCharacterIsNotHurt();
    }

    /** Allows shooting only when character is not hurt. */
    shootOnlyCharacterIsNotHurt() {
        if (!this.character.isHurt()) {
            this.shootOnlyKeydownS();
        }
    }

    /** Removes a projectile after delay. */
    removeShootFromGunshoot(shoot) {
        setTimeout(() => {
            let index = this.GunShoot.indexOf(shoot);
            if (index > -1) {
                this.GunShoot.splice(index, 1);
            }
        }, 400);
    }

    /** Handles endboss logic and collision checks. */
    chekColisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            endboss.updateBehavior();
            endboss.World = this;

            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.endbossAttackCharacter(endboss);
            } else {
                endboss.stopAttack();
            }

            this.checkColisionGunshootWithEndboss(endboss);
            this.checkCollisionFishwithEndboss(endboss);
        });
    }

    /** Endboss attacks the character. */
    endbossAttackCharacter(endboss) {
        endboss.attack(this.character);
    }

    /** Fish collision with endboss. */
    checkCollisionFishwithEndboss(endboss) {
        this.ThrowableObjects.forEach((fish, shootIndex) => {
            endboss.World = this;

            if (fish.isColliding(endboss)) {
                endboss.hitGunEndboss();
                this.StatusBarEndBoss.setPercentage(endboss.energyEndboss);

                if (endboss.isEndbossDead()) {
                    endboss.playDeadSprite();

                    if (!this.isMuted()) {
                        this.soundManager.play('hitTurtle');
                    }

                    setTimeout(() => {
                        const index = this.level.endboss.indexOf(endboss);
                        if (index !== -1) {
                            this.level.endboss.splice(index, 1);
                        }
                    }, 100);

                    this.afterEndbossDeadOpenChestToCollect();
                }

                this.ThrowableObjects.splice(shootIndex, 1);
            }
        });
    }

    /** Gun collision with endboss. */
    checkColisionGunshootWithEndboss(endboss) {
        this.GunShoot.forEach((shoot, shootIndex) => {
            endboss.World = this;

            if (shoot.isColliding(endboss)) {
                endboss.hitGunEndboss();
                this.StatusBarEndBoss.setPercentage(endboss.energyEndboss);

                if (endboss.isEndbossDead()) {
                    endboss.playDeadSprite();

                    if (!this.isMuted()) {
                        this.soundManager.play('hitTurtle');
                    }

                    setTimeout(() => {
                        const indexEndboss = this.level.endboss.indexOf(endboss);
                        if (indexEndboss !== -1) {
                            this.level.endboss.splice(indexEndboss, 1);
                        }
                    }, 100);

                    this.afterEndbossDeadOpenChestToCollect();
                }

                this.GunShoot.splice(shootIndex, 1);
            }
        });
    }

    /** Opens chests after endboss death. */
    afterEndbossDeadOpenChestToCollect() {
        this.deadEndboss = true;

        this.level.chest.forEach(chest => {
            chest.World = this;

            if (!chest.chestAnimationStarted) {
                chest.chestAnimationStarted = true;
                this.soundManager.play('chestSound');
                chest.animate();
            }
        });
    }

    /** Character-enemy collision handling. */
    checkColisionCharacterWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    enemy.attack(this.character);
                }
            }
        });
    }

    /** Gun projectile collision with enemies. */
    checkCollisionGunshootWithEnemy() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            this.GunShoot.forEach((shoot, shootIndex) => {
                if (shoot.isColliding(enemy)) {
                    enemy.hitGunEnemie();

                    if (enemy.isEnemyDead()) {
                        this.level.enemies.splice(enemyIndex, 1);
                    }

                    this.GunShoot.splice(shootIndex, 1);
                }
            });
        });
    }

    /** Fish collision with enemies. */
    checkCollisionFishWithEnemy() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            this.ThrowableObjects.forEach((fish, shootIndex) => {
                if (fish.isColliding(enemy)) {
                    enemy.hitEnemie();

                    if (enemy.isEnemyDead()) {
                        this.level.enemies.splice(enemyIndex, 1);
                    }

                    this.ThrowableObjects.splice(shootIndex, 1);
                }
            });
        });
    }

    /** Star collection. */
    checkColisionCharacterWithStar() {
        this.level.stars.forEach((star, index) => {
            star.World = this;

            if (this.character.isColliding(star)) {
                this.character.hitStar();
                this.statusBarStar.setPercentage(this.character.haveStar);
                this.level.stars.splice(index, 1);
                star.playSound();
            }
        });
    }

    /** Crystal collection. */
    checkColisionCharacterWithCrystal() {
        this.level.crystal.forEach((crystal, index) => {
            crystal.World = this;

            if (this.character.isColliding(crystal)) {
                this.character.hitCrystal();
                this.statusBarCrystal.setPercentage(this.character.haveCrystal);
                this.level.crystal.splice(index, 1);
                crystal.playSound();
            }
        });
    }

    /** Chest collision (win condition). */
    checkColisionWithChest() {
        if (this.deadEndboss) {
            this.level.chest.forEach((chest) => {
                if (this.character.isColliding(chest)) {
                    this.collectChestAndWin();
                }
            });
        }
    }

    /** Triggers win state. */
    collectChestAndWin() {
        this.gameWIN = true;
        this.checkGameWIN();
    }

    /** Enemy death by jumping on them. */
    checkColisionsCharacterFallDownOnEnemy() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            enemy.World = this;

            if (
                this.character.speedY < 0 &&
                this.character.y + this.character.height >= enemy.y &&
                this.character.y + this.character.height <= enemy.y + enemy.height &&
                this.character.x + this.character.width > enemy.x &&
                this.character.x < enemy.x + enemy.width
            ) {
                enemy.playDeadSprite();

                if (!this.isMuted()) {
                    this.soundManager.play('hitTurtle');
                }

                setTimeout(() => {
                    const index = this.level.enemies.indexOf(enemy);
                    if (index !== -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 100);

                this.character.speedY = 5;
            }
        });
    }

    /** Platform collision handling. */
    checkCollisionPlatform() {
        this.isOnPlatform = false;

        this.level.platform.forEach((platform) => {
            if (this.character.isCollidingPlatform(platform)) {

                let charLeft = this.character.x;
                let charRight = this.character.x + this.character.width;
                let platformLeft = platform.x;
                let platformRight = platform.x + platform.width;

                let overlap = Math.min(charRight, platformRight) - Math.max(charLeft, platformLeft);

                if (overlap >= this.character.width / 2) {
                    this.isOnPlatform = true;
                    this.character.y = platform.y - this.character.height + 10;
                    this.character.speedY = 0;
                }
            }
        });
    }
}