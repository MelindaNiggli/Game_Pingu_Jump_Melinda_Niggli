class Character extends MovableObject {

    height = 147;
    width = 150;

    IMAGES_WALKING = [
        'img/pinguin/Character/Walk/Walk_00.svg',
        'img/pinguin/Character/Walk/Walk_01.svg',
        'img/pinguin/Character/Walk/Walk_02.svg',
        'img/pinguin/Character/Walk/Walk_03.svg',
        'img/pinguin/Character/Walk/Walk_04.svg',
        'img/pinguin/Character/Walk/Walk_05.svg',
        'img/pinguin/Character/Walk/Walk_06.svg',
        'img/pinguin/Character/Walk/Walk_07.svg',
        'img/pinguin/Character/Walk/Walk_08.svg',
        'img/pinguin/Character/Walk/Walk_09.svg',
        'img/pinguin/Character/Walk/Walk_10.svg',
        'img/pinguin/Character/Walk/Walk_11.svg'
    ];

    IMAGES_JUMPING_DOWN = [
        'img/pinguin/Character/Parachute/Parachute_00.png',
        'img/pinguin/Character/Parachute/Parachute_01.png',
        'img/pinguin/Character/Parachute/Parachute_02.png',
        'img/pinguin/Character/Parachute/Parachute_03.png',
        'img/pinguin/Character/Parachute/Parachute_04.png',
        'img/pinguin/Character/Parachute/Parachute_05.png',
        'img/pinguin/Character/Parachute/Parachute_06.png',
        'img/pinguin/Character/Parachute/Parachute_07.png',
        'img/pinguin/Character/Parachute/Parachute_08.png',
        'img/pinguin/Character/Parachute/Parachute_09.png',
        'img/pinguin/Character/Parachute/Parachute_10.png',
        'img/pinguin/Character/Parachute/Parachute_11.png',
        'img/pinguin/Character/Parachute/Parachute_12.png',
        'img/pinguin/Character/Parachute/Parachute_13.png'
    ];

    IMAGES_IDLE = [
        'img/pinguin/Character/Idle/Idle_00.svg',
        'img/pinguin/Character/Idle/Idle_01.svg',
        'img/pinguin/Character/Idle/Idle_02.svg',
        'img/pinguin/Character/Idle/Idle_03.svg',
        'img/pinguin/Character/Idle/Idle_04.svg',
        'img/pinguin/Character/Idle/Idle_05.svg',
        'img/pinguin/Character/Idle/Idle_06.svg',
        'img/pinguin/Character/Idle/Idle_07.svg'
    ];

    IMAGES_DEAD = [
        'img/pinguin/Character/Death/Death_00.png',
        'img/pinguin/Character/Death/Death_01.png',
        'img/pinguin/Character/Death/Death_02.png',
        'img/pinguin/Character/Death/Death_03.png',
        'img/pinguin/Character/Death/Death_04.png',
        'img/pinguin/Character/Death/Death_05.png',
        'img/pinguin/Character/Death/Death_06.png',
        'img/pinguin/Character/Death/Death_07.png',
        'img/pinguin/Character/Death/Death_08.png',
        'img/pinguin/Character/Death/Death_09.png',
        'img/pinguin/Character/Death/Death_10.png',
        'img/pinguin/Character/Death/Death_11.png',
        'img/pinguin/Character/Death/Death_12.png'
    ];

    IMAGES_HURT = [
        'img/pinguin/Character/Roll/Roll_0.png',
        'img/pinguin/Character/Roll/Roll_1.png',
        'img/pinguin/Character/Roll/Roll_2.png',
        'img/pinguin/Character/Roll/Roll_3.png',
        'img/pinguin/Character/Roll/Roll_4.png',
        'img/pinguin/Character/Roll/Roll_5.png'
    ];

    IMAGES_GUN = [
        'img/pinguin/Character/Gun/Gun_1.svg'
    ];

    World;
    currentImage = 0;
    speed = 10;

    /**
     * Initializes the character, loads images, applies gravity and starts animations.
     */
    constructor() {
            super().loadImage('img/pinguin/Character/Walk/Walk_00.svg');
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_IDLE);
            this.loadImages(this.IMAGES_JUMPING_DOWN);
            this.loadImages(this.IMAGES_HURT);
            this.loadImages(this.IMAGES_GUN);
            this.loadImages(this.IMAGES_DEAD);
            this.applyGravity();
            this.animate();
            this.x = 100;
            this.y = 200;
            this.width = 170;
            this.height = 170;
        }
        /**
         * Starts movement and animation intervals.
         */
    animate() {
        this.characterIntervall = setInterval(() => {
            this.moveCharacter();
            this.hurtOreDadCharacter();
            this.World.camera_x = -this.x + 60;
        }, 1000 / 60);

        this.characterIdle = setInterval(() => {
            this.playWalkingAnimationImages(this.IMAGES_IDLE);
        }, 450);
    }

    /**
     * Handles movement, input, animation state and actions.
     */
    moveCharacter() {
        if (this.canShowGun()) {
            this.playWalkingAnimationImages(this.IMAGES_GUN);
        } else if (this.World.Keyboard.RIGHT || this.World.Keyboard.LEFT) {
            this.playerHasMoved = true;
            this.playWalkingAnimationImages(this.IMAGES_WALKING);
        }
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();

        if (this.canJump()) {
            if (!this.World.isMuted()) {
                this.World.soundManager.play('character_jumpSound');
            }
            this.jump();
        }
    }

    /**
     * Checks whether the character can move right.
     * @returns {boolean}
     */
    canMoveRight() {
        let endboss = this.World.level.endboss[0];

        if (!this.World.deadEndboss && endboss) {
            let wallX = endboss.x;

            if (this.x >= wallX) {
                this.x = wallX;
                return false;
            }
        }

        return this.World.Keyboard.RIGHT && this.x < this.World.level.level_end_x;
    }

    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
    }

    /**
     * Checks whether the character can move left.
     * @returns {boolean}
     */
    canMoveLeft() {
        return this.World.Keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.isHurtwithCaracter = false;
    }

    /**
     * Checks if the gun animation should be shown.
     * @returns {boolean}
     */
    canShowGun() {
        return this.World.Keyboard.S;
    }

    /**
     * Checks whether the character can jump.
     * @returns {boolean}
     */
    canJump() {
        return this.World.Keyboard.UP && !this.isinAboveGround();
    }

    /**
     * Handles death and hurt animations and triggers game end.
     */
    hurtOreDadCharacter() {
        if (this.isDead()) {
            this.playWalkingAnimationImages(this.IMAGES_DEAD);

            if (!this.gameEnd) {
                this.gameEnd = true;
                this.World.checkGameEndAfterCharacterDead();
                clearInterval(this.interval);
            }
            return;
        }

        if (this.isHurt()) {
            this.playWalkingAnimationImages(this.IMAGES_HURT);
        }
    }

    /**
     * Stops all character-related intervals.
     */
    stop() {
        if (this.characterIntervall) {
            clearInterval(this.characterIntervall);
            this.characterIntervall = null;
        }

        if (this.characterIdle) {
            clearInterval(this.characterIdle);
            this.characterIdle = null;
        }
    }
}