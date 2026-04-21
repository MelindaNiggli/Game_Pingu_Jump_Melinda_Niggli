class MonsterBlue extends MovableObject {

    IMAGES_WALKING = [
        'img/monsters/blue/Walk/Walk_00.png',
        'img/monsters/blue/Walk/Walk_01.png',
        'img/monsters/blue/Walk/Walk_02.png',
        'img/monsters/blue/Walk/Walk_03.png',
        'img/monsters/blue/Walk/Walk_04.png',
        'img/monsters/blue/Walk/Walk_05.png',
        'img/monsters/blue/Walk/Walk_06.png',
        'img/monsters/blue/Walk/Walk_07.png',
        'img/monsters/blue/Walk/Walk_08.png',
        'img/monsters/blue/Walk/Walk_09.png',
        'img/monsters/blue/Walk/Walk_10.png',
        'img/monsters/blue/Walk/Walk_11.png',
        'img/monsters/blue/Walk/Walk_12.png',
        'img/monsters/blue/Walk/Walk_13.png',
        'img/monsters/blue/Walk/Walk_14.png',
        'img/monsters/blue/Walk/Walk_15.png',
        'img/monsters/blue/Walk/Walk_16.png',
        'img/monsters/blue/Walk/Walk_17.png',
        'img/monsters/blue/Walk/Walk_18.png',
        'img/monsters/blue/Walk/Walk_19.png',
    ];

    IMAGES_ATTACK = [
        'img/monsters/blue/Attack/Attack_00.png',
        'img/monsters/blue/Attack/Attack_01.png',
        'img/monsters/blue/Attack/Attack_02.png',
        'img/monsters/blue/Attack/Attack_03.png',
        'img/monsters/blue/Attack/Attack_04.png',
        'img/monsters/blue/Attack/Attack_05.png',
        'img/monsters/blue/Attack/Attack_06.png',
        'img/monsters/blue/Attack/Attack_07.png',
        'img/monsters/blue/Attack/Attack_08.png',
        'img/monsters/blue/Attack/Attack_09.png',
        'img/monsters/blue/Attack/Attack_10.png',
        'img/monsters/blue/Attack/Attack_11.png',
        'img/monsters/blue/Attack/Attack_12.png',
        'img/monsters/blue/Attack/Attack_13.png',
        'img/monsters/blue/Attack/Attack_14.png',
        'img/monsters/blue/Attack/Attack_15.png',
        'img/monsters/blue/Attack/Attack_16.png',
        'img/monsters/blue/Attack/Attack_17.png',
        'img/monsters/blue/Attack/Attack_18.png',
        'img/monsters/blue/Attack/Attack_19.png',
        'img/monsters/blue/Attack/Attack_20.png',
        'img/monsters/blue/Attack/Attack_21.png',
        'img/monsters/blue/Attack/Attack_22.png',
        'img/monsters/blue/Attack/Attack_23.png',
        'img/monsters/blue/Attack/Attack_24.png',
    ];

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

    currentImage = 0;
    deathSound = new Audio('audio/enemyDeath.wav');

    /**
     * Creates a new blue monster instance.
     * Initializes position, size, assets and speed.
     */
    constructor() {
        super().loadImage('img/monsters/blue/Walk/Walk_00.png');
        this.y = 390;
        this.x = 200 + Math.random() * 8000;
        this.height = 200;
        this.width = 170;

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.DEAD_SPRITE);

        this.speed = 0.30 + Math.random() * 3;
    }

    /**
     * Stops all running intervals.
     */
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.attackInterval);
        clearInterval(this.deadInterval);
    }

    /**
     * Plays death animation.
     */
    playDeadSprite() {
        this.deadInterval = setInterval(() => {
            this.playWalkingAnimationImages(this.DEAD_SPRITE);
        }, 1000 / 60);
    }

    /**
     * Starts movement and animation loops.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playWalkingAnimationImages(this.IMAGES_WALKING);
        }, 30);
    }

    /**
     * Starts attack animation against a character.
     *
     * @param {Object} character - Target character to attack
     */
    attack(character) {
        if (!this.isAttacking) {
            this.isAttacking = true;

            this.attackInterval = setInterval(() => {
                this.playWalkingAnimationImages(this.IMAGES_ATTACK);

                if (!this.isColliding(character)) {
                    this.loadImage('img/monsters/blue/Walk/Walk_00.png');
                    this.stopAttack();
                }
            }, 1000 / 60);
        }
    }

    /**
     * Stops attack animation.
     */
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
    }
}