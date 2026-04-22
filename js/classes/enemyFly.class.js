class MonsterFly extends MovableObject {

    IMAGES_FLYING = [
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_0.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_1.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_2.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_3.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_4.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_5.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_6.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_7.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_8.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_9.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_10.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_11.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_12.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_13.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_14.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_15.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_16.png',
        'img/monsters/skeleton-fly/Fly/skeleton-Fly_17.png',
    ];

    IMAGES_ATTACK = [
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_0.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_1.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_2.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_3.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_4.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_5.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_6.png',
        'img/monsters/skeleton-fly/Attack/skeleton-Attack_7.png'
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
     * Creates flying monster and initializes position and assets.
     */
    constructor() {
        super().loadImage('img/monsters/skeleton-fly/Fly/skeleton-Fly_0.png');
        this.y = 280;
        this.x = 200 + Math.random() * 7000;
        this.width = 65;
        this.height = 90;
        this.loadImages(this.IMAGES_FLYING);
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
            this.playWalkingAnimationImages(this.IMAGES_FLYING);
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
                    this.loadImage('img/monsters/skeleton-fly/Fly/skeleton-Fly_0.png');
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