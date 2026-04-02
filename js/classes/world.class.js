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
    gameWinShowStar = new gameWinShowStar();
    gameWinShowCrystal = new gameWinShowCrystal();
    GunShoot = [];
    GunShootL = [];
    ThrowableObjects = [];
    gameEnd = false;
    gameLost = false;
    gameWIN = false;
    deadEndboss = false;
    Keyboard = new Keyboard();
    backgroundMusic = new Audio('audio/backgroundMusic.wav');


       /** Zeichnet die gesamte Welt inkl. Character, Gegner, Objekte, Statusleisten */
       drawWorld(){

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
    
        requestAnimationFrame(() => this.drawWorld());
    }
    /** Fügt mehrere Objekte der Welt hinzu */
    addObjectsToMap(objects){
        objects.forEach(o => this.addToMap(o));
    }

    /** Fügt ein Objekt der Welt hinzu und spiegelt es */
    addToMap(mo){
        if(mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection) this.flipImageBack(mo);
    }

    /** Spiegelt ein Bild horizontal */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /** Setzt die Spiegelung zurück */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /** Prüft, ob das Spiel stummgeschaltet ist */
    isMuted(){
        return localStorage.getItem("muted") === "true";
    }

    /** Konstruktor: initialisiert Canvas, Keyboard, Welt und Hintergrund-Intervall */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startBackgroundMusic();
        this.drawWorld();
        this.setWorld();
        this.interval = setInterval(() => {
            this.CheckColisionsAndThrowObjects();
        }, 200);
        this.interval2 = setInterval(() => {
            this.CheckThrow();
        },100);
    }

    CheckThrow(){
        this.checkThrowObjects();
        this.checkGunShoot();
    }

    /** Setzt das Spiel zurück und startet neu */
    resetGame() {
        this.clearIntervallAndStopBackgroundMusic();
        this.GunShoot = [];
        this.GunShootL = [];
        this.ThrowableObjects = [];
        this.gameWIN = false;
        this.gameEnd = false;
        this.deadEndboss = false;
        this.level = level1;
        this.character = new Character();
        this.setWorld();
        // localStorage.setItem("muted", "false");
        const canvasGame = document.getElementById('canvas');
        const ctx = canvasGame.getContext('2d');
        ctx.clearRect(0, 0, canvasGame.width, canvasGame.height);
        document.getElementById('panelMobile').style.opacity = "1";
        document.getElementById('wrapperButtons').style.right = "11%"
        init();
        console.log("Das Spiel wurde erfolgreich zurückgesetzt!");
    }

    cleanGame(){
        this.clearIntervallAndStopBackgroundMusic();
        this.GunShoot = [];
        this.GunShootL = [];
        this.ThrowableObjects = [];
        this.gameWIN = false;
        this.gameEnd = false;
        this.deadEndboss = false;
        this.level = level1;
        this.character = new Character();
        this.setWorld();
        const canvasGame = document.getElementById('canvas');
        const ctx = canvasGame.getContext('2d');
        ctx.clearRect(0, 0, canvasGame.width, canvasGame.height);
        document.getElementById('panelMobile').style.opacity = "1";
        document.getElementById('wrapperButtons').style.right = "11%"
        init();
        localStorage.setItem("muted", "false");
        console.log("clean");
    }

    /** Stoppt alle Intervalle und pausiert die Hintergrundmusik */
    clearIntervallAndStopBackgroundMusic(){
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        if (this.interval2) {
            clearInterval(this.interval2);
            this.interval2 = null;
        }
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }

    /** Prüft alle Kollisionen und verwaltet Wurfobjekte */
    CheckColisionsAndThrowObjects(){
        this.startBackgroundMusic();
        this.chekColisionsWithEndboss();
        this.checkColisionCharacterWithEnemy();
        this.checkColisionCharacterWithStar();
        this.checkColisionCharacterWithCrystal();
        this.checkColisionWithChest();
        this.checkCollisionPlatform();
        this.checkCollisionFishWithEnemy();
        this.checkCollisionGunshootWithEnemy();
    
        this.checkGameWinHaveStarOreCrystal();  
        this.checkColisionsCharacterFallDownOnEnemy();
    }

    /** Setzt die World-Referenz für den Character */
    setWorld(){
        this.character.World = this;
    }

    /** Startet Hintergrundmusik, wenn nicht stumm */
    startBackgroundMusic(){
        if(localStorage.getItem("muted") === "false" && this.backgroundMusic.paused){
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = 0.3;
            this.backgroundMusic.play().catch(e => console.log("Audio blockiert:", e));
        }
    }

    /** Stoppt Hintergrundmusik, wenn stumm */
    stopBackgroundMusic(){
        if(localStorage.getItem("muted") === "true"){
            this.backgroundMusic.pause();
        }
    }

    /** Prüft, ob das Spiel verloren ist und spielt GameOver-Sound */
    checkGameEND() {
        this.clearIntervallAndStopBackgroundMusic();
        let buttons = document.getElementById('panelMobile');
        let infoButtons = document.getElementById('wrapperButtons');
        if (this.character.gameEnd) {
            buttons.style.opacity = "0";
            infoButtons.style.right = "8%"
            this.gameEnd = true;
            if (!this.isMuted()) {
                this.backgroundMusic.pause();
                this.gameOver.gameOverSound.currentTime = 0;
                this.gameOver.gameOverSound.play().catch(e => console.log("Audio blockiert:", e));
            }
        }
    }

    /** Prüft, ob das Spiel gewonnen ist und spielt Win-Sound */
    checkGameWIN() {
        this.clearIntervallAndStopBackgroundMusic();
        let buttons = document.getElementById('panelMobile');
        let infoButtons = document.getElementById('wrapperButtons');
        if (this.gameWIN) {
            buttons.style.opacity = "0";
            infoButtons.style.right = "8%"
            if (!this.isMuted()) {
                this.gameWin.winSound.currentTime = 0;
                this.gameWin.winSound.play().catch(e => console.log("Audio blockiert:", e));
            }
        }
    }

    /** Zeigt Sterne und Kristalle im Gewinnfall an */
    checkGameWinHaveStarOreCrystal() {
        this.gameWinShowStar.check(this.gameWIN, this.character.haveStar); 
        this.gameWinShowCrystal.checkNow(this.gameWIN, this.character.haveCrystal); 
    }



    /** Prüft, ob der Spieler ein Wurfobjekt abwirft */
    checkThrowObjects() {
        if (this.ThrowableObjects.length < 13 && this.keyboard.D) {
            let fish;


            if (this.character.otherDirection) {
                fish = new ThrowableObjectFish(this.character.x - 80, this.character.y -5, true, this);
            } else {
                fish = new ThrowableObjectFish(this.character.x + 80, this.character.y -5, false, this);
            }

      
                this.ThrowableObjects.push(fish);
                this.statusBarFish.setPercentage(this.ThrowableObjects.length);
        
        }
    }

    /** Prüft, ob der Spieler schießt */
    checkGunShoot() {
        if (!this.keyboard) return;
        this.shootOnlyCharacterIsNotHurt();   
    }

    /** Schießt nur, wenn der Character nicht verletzt ist */
    shootOnlyCharacterIsNotHurt(){
        if(!this.character.isHurt()){
            this.shootOnlyKeydownS();
        } 
    }

    /** Schießt bei Tastendruck S, maximal 13 Schüsse gleichzeitig */
    shootOnlyKeydownS(){
        if (this.GunShootL.length < 13 && this.keyboard.S ) {
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
        }
    }

    /** Entfernt einen Schuss aus dem GunShoot-Array nach 1,5 Sekunden */
    removeShootFromGunshoot(shoot){
        setTimeout(() => {
            let index = this.GunShoot.indexOf(shoot);
            if (index > -1) {
                this.GunShoot.splice(index, 1);
            }
        }, 400);
    }

    /** Prüft Kollisionen zwischen Character und Endboss */
    chekColisionsWithEndboss(){
        this.level.endboss.forEach((endboss) => {
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

    /** Endboss greift Character an */
    endbossAttackCharacter(endboss){
        endboss.attack(this.character);
    }

    /** Prüft Kollisionen von Wurfobjekten mit Endboss */
    checkCollisionFishwithEndboss(endboss){
        this.ThrowableObjects.forEach((fish, shootIndex) => {
            endboss.World = this;
            if (fish.isColliding(endboss)) {
                endboss.hitGunEndboss();
                this.StatusBarEndBoss.setPercentage(endboss.energyEndboss);
                if (endboss.isEndbossDead()) {
                    endboss.playSound();
                    const index = this.level.endboss.indexOf(endboss);
                    if (index > -1) {
                        this.level.endboss.splice(index, 1);
                    }
                    this.afterEndbossDeadOpenChestToCollect();
                }
                this.ThrowableObjects.splice(shootIndex, 1);
            }
        });
    }

    checkColisionGunshootWithEndboss(endboss) {
        this.GunShoot.forEach((shoot, shootIndex) => {
            endboss.World = this;
            if (shoot.isColliding(endboss)) {
                endboss.hitGunEndboss();
                this.StatusBarEndBoss.setPercentage(endboss.energyEndboss);
                if (endboss.isEndbossDead()) {
                    endboss.playSound();
                    const index = this.level.endboss.indexOf(endboss);
                    if (index > -1) {
                        this.level.endboss.splice(index, 1);
                    }
                    this.afterEndbossDeadOpenChestToCollect();
                }
                this.GunShoot.splice(shootIndex, 1);
            }
        });
    }

    /** Öffnet Schatztruhe, wenn Endboss tot ist */
    afterEndbossDeadOpenChestToCollect(){
        this.deadEndboss = true;
        this.level.chest.forEach(chest => {
            chest.World = this;
            if (!chest.chestAnimationStarted) {
                chest.chestAnimationStarted = true;
                chest.playSound();
                chest.animate();   
            }
        });
    }

    /** Prüft Kollisionen zwischen Character und Gegner */
    checkColisionCharacterWithEnemy(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                enemy.attack(this.character);
            }
        });
    }

    /** Prüft Kollisionen zwischen Schüssen und Gegnern */
    checkCollisionGunshootWithEnemy(){
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

    /** Prüft Kollisionen zwischen Wurfobjekten und Gegnern */
    checkCollisionFishWithEnemy(){
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

    /** Prüft Kollisionen zwischen Character und Sternen */
    checkColisionCharacterWithStar(){
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

    /** Prüft Kollisionen zwischen Character und Kristallen */
    checkColisionCharacterWithCrystal(){
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

    /** Prüft Kollisionen zwischen Character und Schatztruhe */
    checkColisionWithChest(){
        if(this.deadEndboss){
            this.level.chest.forEach((chest) => {
                if (this.character.isColliding(chest)){
                    this.collectChestAndWin();
                }
            });
        }
    }

    /** Character sammelt Truhe und gewinnt das Spiel */
    collectChestAndWin(){
        this.gameWIN = true;
        this.checkGameWIN();
    }

    /** Prüft, ob Character auf Gegner fällt und tötet diesen */
    checkColisionsCharacterFallDownOnEnemy() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (
                this.character.speedY < 0 &&
                this.character.y + this.character.height >= enemy.y &&
                this.character.y + this.character.height <= enemy.y + enemy.height &&
                this.character.x + this.character.width > enemy.x &&
                this.character.x < enemy.x + enemy.width
            ) {
                this.level.enemies.splice(enemyIndex, 1);
                this.character.speedY = 5; 

                if (!this.isMuted() && enemy.deathSound) {
                    enemy.deathSound.currentTime = 0;
                    enemy.deathSound.play();
                }
            }
        });
    }

    checkCollisionPlatform() {
        setInterval(() => {   
            this.isOnPlatform = false;
    
            this.level.platform.forEach((platform) => {
    
                if (this.character.isCollidingPlatform(platform)) {
    
                    // Grenzen
                    let charLeft = this.character.x;
                    let charRight = this.character.x + this.character.width;
    
                    let platformLeft = platform.x;
                    let platformRight = platform.x + platform.width;
    
                    // Überlappung berechnen
                    let overlap = Math.min(charRight, platformRight) - Math.max(charLeft, platformLeft);
    
                    // Prüfen: mindestens 50% der Breite auf Plattform
                    if (overlap >= this.character.width / 2) {
                        this.isOnPlatform = true;
    
                        // Sauber oben platzieren
                        this.character.y = platform.y - this.character.height;
                        this.character.speedY = 0;
                    }
                }
            });
    
        }, 1000 / 90);
    }
 
}