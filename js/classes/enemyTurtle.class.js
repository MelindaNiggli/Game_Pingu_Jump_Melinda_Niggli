class MonsterTurtle extends MovableObject {

    IMAGES_WALKING = [
        'img/monsters/turtle/Walk/Walk_00.png',
        'img/monsters/turtle/Walk/Walk_01.png',
        'img/monsters/turtle/Walk/Walk_02.png',
        'img/monsters/turtle/Walk/Walk_03.png',
        'img/monsters/turtle/Walk/Walk_04.png',
        'img/monsters/turtle/Walk/Walk_05.png',
        'img/monsters/turtle/Walk/Walk_06.png',
        'img/monsters/turtle/Walk/Walk_07.png',
        'img/monsters/turtle/Walk/Walk_08.png',
        'img/monsters/turtle/Walk/Walk_09.png',
        'img/monsters/turtle/Walk/Walk_10.png',
        'img/monsters/turtle/Walk/Walk_11.png',
        'img/monsters/turtle/Walk/Walk_12.png',
        'img/monsters/turtle/Walk/Walk_13.png',
        'img/monsters/turtle/Walk/Walk_14.png',
        'img/monsters/turtle/Walk/Walk_15.png',
        'img/monsters/turtle/Walk/Walk_16.png',
        'img/monsters/turtle/Walk/Walk_17.png',
        'img/monsters/turtle/Walk/Walk_18.png',
        'img/monsters/turtle/Walk/Walk_19.png',
        'img/monsters/turtle/Walk/Walk_20.png',
        'img/monsters/turtle/Walk/Walk_21.png',
        'img/monsters/turtle/Walk/Walk_22.png',
        'img/monsters/turtle/Walk/Walk_23.png',
        'img/monsters/turtle/Walk/Walk_24.png',
        'img/monsters/turtle/Walk/Walk_25.png',
        'img/monsters/turtle/Walk/Walk_26.png',
        'img/monsters/turtle/Walk/Walk_27.png',
        'img/monsters/turtle/Walk/Walk_28.png',
        'img/monsters/turtle/Walk/Walk_29.png',
    ];

    IMAGES_ATTACK = [
        'img/monsters/turtle/Attack/Attack_00.png',
        'img/monsters/turtle/Attack/Attack_01.png',
        'img/monsters/turtle/Attack/Attack_02.png',
        'img/monsters/turtle/Attack/Attack_03.png',
        'img/monsters/turtle/Attack/Attack_04.png',
        'img/monsters/turtle/Attack/Attack_05.png',
        'img/monsters/turtle/Attack/Attack_06.png',
        'img/monsters/turtle/Attack/Attack_07.png',
        'img/monsters/turtle/Attack/Attack_08.png',
        'img/monsters/turtle/Attack/Attack_09.png',
        'img/monsters/turtle/Attack/Attack_10.png',
        'img/monsters/turtle/Attack/Attack_11.png',
        'img/monsters/turtle/Attack/Attack_12.png',
        'img/monsters/turtle/Attack/Attack_13.png',
        'img/monsters/turtle/Attack/Attack_14.png',
        'img/monsters/turtle/Attack/Attack_15.png',
        'img/monsters/turtle/Attack/Attack_16.png',
        'img/monsters/turtle/Attack/Attack_17.png',
        'img/monsters/turtle/Attack/Attack_18.png',
        'img/monsters/turtle/Attack/Attack_19.png',
        'img/monsters/turtle/Attack/Attack_20.png',
        'img/monsters/turtle/Attack/Attack_21.png',
        'img/monsters/turtle/Attack/Attack_22.png',
        'img/monsters/turtle/Attack/Attack_23.png',
        'img/monsters/turtle/Attack/Attack_24.png',
        'img/monsters/turtle/Attack/Attack_25.png',
        'img/monsters/turtle/Attack/Attack_26.png',
        'img/monsters/turtle/Attack/Attack_27.png',
        'img/monsters/turtle/Attack/Attack_28.png',
        'img/monsters/turtle/Attack/Attack_29.png',
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
     * Creates a MonsterTurtle instance at a random X position.
     * Initializes images, size and speed.
     */
    constructor() {
        super().loadImage('img/monsters/turtle/Walk/Walk_00.png');
        this.y = 410;
        this.x = 200 + Math.random() * 6000;
        this.width = 170;
        this.height = 170;

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.DEAD_SPRITE);

        this.speed = 0.30 + Math.random() * 3;
    }

    /**
     * Stops all active intervals (movement, animation, attack, death).
     */
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.attackInterval);
        clearInterval(this.deadInterval);
    }

    /**
     * Plays the death animation.
     */
    playDeadSprite() {
        this.deadInterval = setInterval(() => {
            this.playWalkingAnimationImages(this.DEAD_SPRITE);
        }, 1000 / 60);
    }

    /**
     * Starts movement and walking animation.
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
     * Starts attack animation if not already attacking.
     * Stops attack when player leaves collision range.
     * @param {Object} character - Target player character
     */
    attack(character) {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.attackInterval = setInterval(() => {
                this.playWalkingAnimationImages(this.IMAGES_ATTACK);
                if (!this.isColliding(character)) {
                    this.loadImage('img/monsters/turtle/Walk/Walk_00.png');
                    this.stopAttack();
                }
            }, 1000 / 60);
        }
    }

    /**
     * Stops attack loop.
     */
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
    }
}