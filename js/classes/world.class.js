class World {
    character = new Character();
    level = initLevel();
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
    lastShootTime = 0;
    lastThrowTime = 0;
    shootCooldown = 130;
    throwCooldown = 300;
    gameEnd = false;
    gameLost = false;
    gameWIN = false;
    deadEndboss = false;
    Keyboard = new Keyboard();
    intervalIds = [];
    requestId;

    /** Main render loop. Draws all world elements including background,entities, UI elements, and game state overlays.*/
    drawWorld() {
        if (!this.isRunning) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        const visibleLeft = -this.camera_x - 100;
        const visibleRight = -this.camera_x + this.canvas.width + 100;
        const inView = (obj) => obj.x + obj.width > visibleLeft && obj.x < visibleRight;
        const addVisible = (objects) => objects.filter(inView).forEach(o => this.addToMap(o));
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        addVisible(this.level.platform);
        addVisible(this.level.chest);
        addVisible(this.level.enemies);
        addVisible(this.level.stars);
        addVisible(this.level.crystal);
        addVisible(this.level.endboss);
        addVisible(this.ThrowableObjects);
        addVisible(this.GunShoot);
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
        this.requestId = null;
    }

    /** Adds multiple objects to the canvas. */
    addObjectsToMap(objects) { objects.forEach(o => this.addToMap(o)); }

    /** Draws a single movable object and handles direction flipping.*/
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /** Flips an object horizontally before rendering. */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-mo.x, -mo.y);
    }

    /** Restores object orientation after rendering.*/
    flipImageBack(mo) { this.ctx.restore(); }

    /** Returns whether sound is muted.*/
    isMuted() { return this.soundManager.isMuted(); }

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
        if (isNotMutedBegin) { this.soundManager.playMusic(); }
        this.level.enemies.forEach(enemy => enemy.animate());
        this.intervalIds.push(setInterval(() => {
            this.CheckColisionsAndThrowObjects();
            this.CheckThrow();
            this.checkCollisionPlatform();
        }, 1000 / 60));
    }

    /** Starts the game loop. */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.drawWorld();
    }

    /** Links the character to the world instance.*/
    setWorld() { this.character.World = this; }

    /** Starts background music if sound is enabled. */
    startBackgroundMusic() { if (!this.isMuted()) { this.soundManager.playMusic(); } }

    /** Stops all background music.*/
    stopBackgroundMusic() {
        this.soundManager.stopMusic();
        this.soundManager.stopEndbossMusic();
    }

    /** Handles periodic game checks for shooting and throwing objects. */
    CheckThrow() {
        this.checkThrowObjects();
        this.checkGunShoot();
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
    clearAllEnemiesIntervalls() { if (this.level && this.level.enemies) { this.level.enemies.forEach(enemy => { if (enemy.stop) enemy.stop(); }); } }

    /** Stops all chest-related intervals.*/
    clearAllChestIntervalls() { this.level.chest.forEach(chest => { if (chest.stop) chest.stop(); }); }

    /**  Stops character-related intervals. */
    clearAllIntervallCharacter() { this.character.stop(); }

    /** Ends the game if the weapon limit is reached.*/
    gameOverWhenMaxWeapons() { gameOverWhenMaxWeaponsNow(this); }

    /** Checks if the character has died and triggers game over state. */
    checkGameEndAfterCharacterDead() { checkGameEndAfterCharacterDeadNow(this); }

    /** Handles game win logic and plays win sound once. */
    checkGameWIN() { checkGameWINNow(this) }

    /** Updates win UI for stars and crystals. */
    checkGameWinHaveStarOreCrystal() { checkGameWinHaveStarOreCrystalNow(this) }

    /** Handles fish throwing input with cooldown and limit. */
    checkThrowObjects() {
        let now = Date.now();
        if (this.ThrowableObjectsL.length < 5 && this.keyboard.D && now - this.lastThrowTime > this.throwCooldown) {
            this.lastThrowTime = now;
            let fish;
            if (this.character.otherDirection) {
                fish = new ThrowableObjectFish(this.character.x - 80, this.character.y + 15, true, this);
            } else {
                fish = new ThrowableObjectFish(this.character.x + 80, this.character.y + 15, false, this);
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
        if (this.GunShootL.length < 5 && this.keyboard.S && now - this.lastShootTime > this.shootCooldown) {
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
            this.soundManager.play('shoot_sound');
        }
    }

    /** Checks if shooting is allowed. */
    checkGunShoot() {
        if (!this.keyboard) return;
        this.shootOnlyCharacterIsNotHurt();
    }

    /** Allows shooting only when character is not hurt. */
    shootOnlyCharacterIsNotHurt() { this.shootOnlyKeydownS(); }

    /** Handles endboss logic and collision checks. */
    chekColisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            endboss.World = this;
            if (this.character.isColliding(endboss)) {
                this.statusBar.setPercentage(this.character.energy);
                this.endbossAttackCharacter(endboss);
            } else { endboss.stopAttack(); }
            this.checkColisionGunshootWithEndboss(endboss);
            this.checkCollisionFishwithEndboss(endboss);
        });
    }

    /** Endboss attacks the character. */
    endbossAttackCharacter(endboss) { endboss.attack(this.character); }

    /** Fish collision with endboss. */
    checkCollisionFishwithEndboss(endboss) {
        this.ThrowableObjects.forEach((fish, shootIndex) => {
            endboss.World = this;
            if (fish.isColliding(endboss)) {
                endboss.hitGunEndboss();
                this.StatusBarEndBoss.setPercentage(endboss.energyEndboss);
                this.removeEndbossAndStartChest(endboss)
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
                this.removeEndbossAndStartChest(endboss)
                this.GunShoot.splice(shootIndex, 1);
            }
        });
    }

    removeEndbossAndStartChest(endboss) {
        if (endboss.isEndbossDead()) {
            if (!this.isMuted()) { this.soundManager.play('hitTurtle'); }
            const index = this.level.endboss.indexOf(endboss);
            if (index !== -1) {
                endboss.playDeadSprite();
                this.level.endboss.splice(index, 1);
                this.soundManager.stopEndbossMusic()
                endboss.isDead = true;
                this.afterEndbossDeadOpenChestToCollect();
                endboss.stop();
                this.afterEndbossDeadOpenChestToCollect();
            }
        }
    }

    /** Opens chests after endboss death. */
    afterEndbossDeadOpenChestToCollect() { afterEndbossDeadOpenChestToCollectNow(this) }

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
                    if (enemy.isEnemyDead()) { this.level.enemies.splice(enemyIndex, 1); }
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
                    if (enemy.isEnemyDead()) { this.level.enemies.splice(enemyIndex, 1); }
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
            this.level.chest.forEach((chest) => { if (this.character.isColliding(chest)) { this.collectChestAndWin(); } });
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
            const char = this.character;
            const charBottom = char.y + char.height;
            const enemyTop = enemy.y;
            const verticalHit = char.speedY < 0 && charBottom >= enemyTop && charBottom <= enemyTop + 40;
            const horizontalHit = char.x + char.width > enemy.x + 15 && char.x < enemy.x + enemy.width - 15;
            if (verticalHit && horizontalHit) {
                enemy.playDeadSprite();
                if (!this.isMuted()) { this.soundManager.play('hitTurtle'); }
                this.character.speedY = 8;
                setTimeout(() => {
                    const index = this.level.enemies.indexOf(enemy);
                    if (index !== -1) { this.level.enemies.splice(index, 1); }
                }, 100);
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