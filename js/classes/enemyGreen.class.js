class MonsterGreen extends MovableObject {

    IMAGES_WALKING = [
        'img/monsters/green/Walk/Walk_0.png',
        'img/monsters/green/Walk/Walk_1.png',
        'img/monsters/green/Walk/Walk_2.png',
        'img/monsters/green/Walk/Walk_3.png',
        'img/monsters/green/Walk/Walk_4.png',
        'img/monsters/green/Walk/Walk_5.png',
        'img/monsters/green/Walk/Walk_6.png',
        'img/monsters/green/Walk/Walk_7.png',
        'img/monsters/green/Walk/Walk_8.png',
        'img/monsters/green/Walk/Walk_9.png',
        'img/monsters/green/Walk/Walk_10.png',
        'img/monsters/green/Walk/Walk_11.png',
        'img/monsters/green/Walk/Walk_12.png',
        'img/monsters/green/Walk/Walk_13.png',
        'img/monsters/green/Walk/Walk_14.png',
        'img/monsters/green/Walk/Walk_15.png',
        'img/monsters/green/Walk/Walk_16.png',
        'img/monsters/green/Walk/Walk_17.png',
    ];

    IMAGES_ATTACK = [
        'img/monsters/green/Attack/skeleton-Attack_0.png',
        'img/monsters/green/Attack/skeleton-Attack_1.png',
        'img/monsters/green/Attack/skeleton-Attack_2.png',
        'img/monsters/green/Attack/skeleton-Attack_3.png',
        'img/monsters/green/Attack/skeleton-Attack_4.png',
        'img/monsters/green/Attack/skeleton-Attack_5.png',
        'img/monsters/green/Attack/skeleton-Attack_6.png',
        'img/monsters/green/Attack/skeleton-Attack_7.png',
        'img/monsters/green/Attack/skeleton-Attack_8.png',
        'img/monsters/green/Attack/skeleton-Attack_9.png',
        'img/monsters/green/Attack/skeleton-Attack_10.png',
        'img/monsters/green/Attack/skeleton-Attack_11.png',
        'img/monsters/green/Attack/skeleton-Attack_12.png',
        'img/monsters/green/Attack/skeleton-Attack_13.png',
        'img/monsters/green/Attack/skeleton-Attack_14.png',
        'img/monsters/green/Attack/skeleton-Attack_15.png',
        'img/monsters/green/Attack/skeleton-Attack_16.png',
        'img/monsters/green/Attack/skeleton-Attack_17.png',
        'img/monsters/green/Attack/skeleton-Attack_18.png',
        'img/monsters/green/Attack/skeleton-Attack_19.png',
        'img/monsters/green/Attack/skeleton-Attack_20.png',
        'img/monsters/green/Attack/skeleton-Attack_21.png',
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

    /**
     * Creates a bomb monster and initializes position and stats.
     */
    constructor() {
        super().loadImage('img/monsters/green/Walk/Walk_0.png');
        this.y = 350;
        this.x = 200 + Math.random() * 7000;
        this.width = 260;
        this.height = 250;

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
     * @param {Object} character - Target character
     */
    attack(character) {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.attackInterval = setInterval(() => {
                this.playWalkingAnimationImages(this.IMAGES_ATTACK);
                if (!this.isColliding(character)) {
                    this.loadImage('img/monsters/green/Walk/Walk_0.png');
                    this.stopAttack();
                }
            }, 1000 / 70);
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