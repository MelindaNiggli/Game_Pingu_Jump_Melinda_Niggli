/** End boss enemy (turtle) with AI behavior, animations, and attack logic. */
class endBossTurtle extends MovableObject {

    /** Reference to game world. */
    World;

    /** Sprite dimensions. */
    width = 290;
    height = 290;

    /** Idle animation frames. */
    IMAGES_IDLE = [
        'img/monsters/endboss_turtle/Idle/Idle_00.png',
        'img/monsters/endboss_turtle/Idle/Idle_01.png',
        'img/monsters/endboss_turtle/Idle/Idle_02.png',
        'img/monsters/endboss_turtle/Idle/Idle_03.png',
        'img/monsters/endboss_turtle/Idle/Idle_04.png',
        'img/monsters/endboss_turtle/Idle/Idle_05.png',
        'img/monsters/endboss_turtle/Idle/Idle_06.png',
        'img/monsters/endboss_turtle/Idle/Idle_07.png',
        'img/monsters/endboss_turtle/Idle/Idle_08.png',
        'img/monsters/endboss_turtle/Idle/Idle_09.png',
        'img/monsters/endboss_turtle/Idle/Idle_10.png',
        'img/monsters/endboss_turtle/Idle/Idle_11.png',
        'img/monsters/endboss_turtle/Idle/Idle_12.png',
        'img/monsters/endboss_turtle/Idle/Idle_13.png',
        'img/monsters/endboss_turtle/Idle/Idle_14.png',
        'img/monsters/endboss_turtle/Idle/Idle_15.png',
        'img/monsters/endboss_turtle/Idle/Idle_16.png',
        'img/monsters/endboss_turtle/Idle/Idle_17.png',
        'img/monsters/endboss_turtle/Idle/Idle_18.png',
        'img/monsters/endboss_turtle/Idle/Idle_18.png',
    ];

    /** Walk animation frames. */
    IMAGES_WALK = [
        'img/monsters/endboss_turtle/Walk/Walk_00.png',
        'img/monsters/endboss_turtle/Walk/Walk_01.png',
        'img/monsters/endboss_turtle/Walk/Walk_02.png',
        'img/monsters/endboss_turtle/Walk/Walk_03.png',
        'img/monsters/endboss_turtle/Walk/Walk_04.png',
        'img/monsters/endboss_turtle/Walk/Walk_05.png',
        'img/monsters/endboss_turtle/Walk/Walk_06.png',
        'img/monsters/endboss_turtle/Walk/Walk_07.png',
        'img/monsters/endboss_turtle/Walk/Walk_08.png',
        'img/monsters/endboss_turtle/Walk/Walk_09.png',
        'img/monsters/endboss_turtle/Walk/Walk_10.png',
        'img/monsters/endboss_turtle/Walk/Walk_11.png',
        'img/monsters/endboss_turtle/Walk/Walk_12.png',
        'img/monsters/endboss_turtle/Walk/Walk_13.png',
        'img/monsters/endboss_turtle/Walk/Walk_14.png',
        'img/monsters/endboss_turtle/Walk/Walk_15.png',
        'img/monsters/endboss_turtle/Walk/Walk_16.png',
        'img/monsters/endboss_turtle/Walk/Walk_17.png',
        'img/monsters/endboss_turtle/Walk/Walk_18.png',
        'img/monsters/endboss_turtle/Walk/Walk_19.png',
        'img/monsters/endboss_turtle/Walk/Walk_20.png',
        'img/monsters/endboss_turtle/Walk/Walk_21.png',
        'img/monsters/endboss_turtle/Walk/Walk_22.png',
        'img/monsters/endboss_turtle/Walk/Walk_23.png',
        'img/monsters/endboss_turtle/Walk/Walk_24.png',
        'img/monsters/endboss_turtle/Walk/Walk_25.png',
        'img/monsters/endboss_turtle/Walk/Walk_26.png',
        'img/monsters/endboss_turtle/Walk/Walk_27.png',
        'img/monsters/endboss_turtle/Walk/Walk_28.png',
        'img/monsters/endboss_turtle/Walk/Walk_29.png',
    ];

    /** Attack animation frames. */
    IMAGES_ATTACK = [
        'img/monsters/endboss_turtle/Attack/Attack_00.png',
        'img/monsters/endboss_turtle/Attack/Attack_01.png',
        'img/monsters/endboss_turtle/Attack/Attack_02.png',
        'img/monsters/endboss_turtle/Attack/Attack_03.png',
        'img/monsters/endboss_turtle/Attack/Attack_04.png',
        'img/monsters/endboss_turtle/Attack/Attack_05.png',
        'img/monsters/endboss_turtle/Attack/Attack_06.png',
        'img/monsters/endboss_turtle/Attack/Attack_07.png',
        'img/monsters/endboss_turtle/Attack/Attack_08.png',
        'img/monsters/endboss_turtle/Attack/Attack_09.png',
        'img/monsters/endboss_turtle/Attack/Attack_10.png',
        'img/monsters/endboss_turtle/Attack/Attack_11.png',
        'img/monsters/endboss_turtle/Attack/Attack_12.png',
        'img/monsters/endboss_turtle/Attack/Attack_13.png',
        'img/monsters/endboss_turtle/Attack/Attack_14.png',
        'img/monsters/endboss_turtle/Attack/Attack_15.png',
        'img/monsters/endboss_turtle/Attack/Attack_16.png',
        'img/monsters/endboss_turtle/Attack/Attack_17.png',
        'img/monsters/endboss_turtle/Attack/Attack_18.png',
        'img/monsters/endboss_turtle/Attack/Attack_19.png',
        'img/monsters/endboss_turtle/Attack/Attack_20.png',
        'img/monsters/endboss_turtle/Attack/Attack_21.png',
        'img/monsters/endboss_turtle/Attack/Attack_22.png',
        'img/monsters/endboss_turtle/Attack/Attack_23.png',
        'img/monsters/endboss_turtle/Attack/Attack_24.png',
        'img/monsters/endboss_turtle/Attack/Attack_25.png',
        'img/monsters/endboss_turtle/Attack/Attack_26.png',
        'img/monsters/endboss_turtle/Attack/Attack_27.png',
        'img/monsters/endboss_turtle/Attack/Attack_28.png',
        'img/monsters/endboss_turtle/Attack/Attack_29.png',
    ];

    /** Death animation frames. */
    DEAD_SPRITE = [
        'img/monsters/DeadSprite/DeadFx_00.png',
        'img/monsters/DeadSprite/DeadFx_01.png',
        'img/monsters/DeadSprite/DeadFx_02.png',
        'img/monsters/DeadSprite/DeadFx_03.png',
        'img/monsters/DeadSprite/DeadFx_04.png',
        'img/monsters/DeadSprite/DeadFx_05.png',
        'img/monsters/DeadSprite/DeadFx_06.png',
        'img/monsters/DeadSprite/DeadFx_07.png',
        'img/monsters/DeadSprite/DeadFx_08.png',
        'img/monsters/DeadSprite/DeadFx_09.png',
        'img/monsters/DeadSprite/DeadFx_10.png',
        'img/monsters/DeadSprite/DeadFx_11.png',
        'img/monsters/DeadSprite/DeadFx_12.png',
        'img/monsters/DeadSprite/DeadFx_13.png',
        'img/monsters/DeadSprite/DeadFx_14.png',
        'img/monsters/DeadSprite/DeadFx_15.png',
        'img/monsters/DeadSprite/DeadFx_16.png',
        'img/monsters/DeadSprite/DeadFx_17.png',
        'img/monsters/DeadSprite/DeadFx_18.png',
        'img/monsters/DeadSprite/DeadFx_19.png',
    ];

    /** Current animation frame index. */
    currentImage = 0;

    /** Initializes end boss position, assets, and idle behavior. */
    constructor() {
        super().loadImage('img/monsters/endboss_turtle/Attack/Attack_00.png');
        this.y = 300;
        this.x = 7030;

        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);

        this.hasPlayedWalkSound = false;
        this.startIdle();
    }

    /** Stops all running intervals. */
    stop() {
        clearInterval(this.idleInterval);
        clearInterval(this.attackInterval);
        clearInterval(this.deadInterval);
    }

    /** Starts idle behavior loop and state updates. */
    startIdle() {
        this.idleInterval = setInterval(() => {
            if (!this.isAttacking) {
                this.playWalkingAnimationImages(this.IMAGES_IDLE);
            }
            this.updateBehavior();
        }, 1000 / 60);
    }

    /** Plays death sound if not muted. */
    playSound() {
        if (!this.World.isMuted()) {
            this.World.soundManager.play('endbossdeathSound');
        }
    }

    /** Plays death animation. */
    playDeadSprite() {
        this.deadInterval = setInterval(() => {
            this.playWalkingAnimationImages(this.DEAD_SPRITE);
        }, 100);
    }

    /** Updates AI behavior based on player position. */
    updateBehavior() {
        if (!this.World || !this.World.character) return;

        let player = this.World.character;

        const triggerX = 6500;
        const stopX = 6500;

        if (player.x > triggerX && this.x > stopX) {
            this.moveToCharacter(player);
        }
    }

    /** Moves boss towards player and triggers music. */
    moveToCharacter(player) {
        const speed = 2;

        if (this.World.deadEndboss) {
            this.World.soundManager.stopEndbossMusic();
            return;
        }

        if (player.x < this.x) {

            if (!this.hasPlayedWalkSound) {
                this.hasPlayedWalkSound = true;

                if (!this.World.isMuted()) {
                    this.World.soundManager.playMusicEndbossMusic();
                }
            }

            this.playWalkingAnimationImages(this.IMAGES_WALK);
            this.x -= speed;
            this.otherDirection = false;
        }
    }

    /** Starts attack animation against player. */
    attack(character) {
        if (!this.isAttacking) {
            this.isAttacking = true;

            this.attackInterval = setInterval(() => {
                this.playWalkingAnimationImages(this.IMAGES_ATTACK);

                if (!this.isColliding(character)) {
                    this.loadImage('img/monsters/endboss_turtle/Attack/Attack_00.png');
                    this.stopAttack();
                }
            }, 1000 / 60);
        }
    }

    /** Stops attack animation. */
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
    }
}