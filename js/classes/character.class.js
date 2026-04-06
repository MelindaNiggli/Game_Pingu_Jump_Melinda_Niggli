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
        'img/pinguin/Character/Parachute/Parachute_13.png',
    ];

    IMAGES_IDLE = [
        'img/pinguin/Character/Idle/Idle_00.svg',
        'img/pinguin/Character/Idle/Idle_01.svg',
        'img/pinguin/Character/Idle/Idle_02.svg',
        'img/pinguin/Character/Idle/Idle_03.svg',
        'img/pinguin/Character/Idle/Idle_04.svg',
        'img/pinguin/Character/Idle/Idle_05.svg',
        'img/pinguin/Character/Idle/Idle_06.svg',
        'img/pinguin/Character/Idle/Idle_07.svg',
    ]

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
        'img/pinguin/Character/Death/Death_12.png',
    ];

    IMAGES_HURT = [
        'img/pinguin/Character/Roll/Roll_0.png',
        'img/pinguin/Character/Roll/Roll_1.png',
        'img/pinguin/Character/Roll/Roll_2.png',
        'img/pinguin/Character/Roll/Roll_3.png',
        'img/pinguin/Character/Roll/Roll_4.png',
        'img/pinguin/Character/Roll/Roll_5.png',
    ];


    IMAGES_GUN = [
        'img/pinguin/Character/Gun/Gun_1.svg',
    ];

    World;
    currentImage = 0;
    speed = 9;
    walking_sound = new Audio('./audio/walk.mp3');
    hurtSound = new Audio('./audio/hit.wav');
    jumpSound = new Audio('./audio/Jump.mp3');

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
        this.width = 170;
        this.height = 170;
    }


    stop() {
        clearInterval(this.characterIntervall);
        clearInterval(this.characterIdle );
        this.stopSound(this.walking_sound);
        this.stopSound(this.hurtSound);
        this.stopSound(this.jumpSound);
    }

    stopSound(sound) {
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.src = ''; 
        }
    }


animate() {
   this.characterIntervall = setInterval(() => {
        this.moveCharacter();
        this.hurtOreDadCharacter();
        this.World.camera_x = -this.x + 60;
    },1000/60);

   this.characterIdle = setInterval(() => {
        this.playWalkingAnimationImages(this.IMAGES_IDLE);
    },450);
}



moveCharacter() {
    if (this.canShowGun()) {
        this.playWalkingAnimationImages(this.IMAGES_GUN);
    } else if (this.World.Keyboard.RIGHT || this.World.Keyboard.LEFT) {
        this.playWalkingAnimationImages(this.IMAGES_WALKING);  
    }
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();

    if (this.canJump()) {
        if (!this.World.isMuted()){
            this.jumpSound.currentTime = 0;
            this.jumpSound.play();
        }
        this.jump();
    }
}

canMoveRight(){
    if (!this.World.deadEndboss && this.x > 7000) {
        return false;
    }
    return this.World.Keyboard.RIGHT && this.x < this.World.level.level_end_x;
};


moveRight(){
    super.moveRight();
    this.otherDirection = false;
};
canMoveLeft(){
   return this.World.Keyboard.LEFT && this.x > 0;
};

moveLeft(){
    super.moveLeft();
    this.otherDirection = true;
    this.isHurtwithCaracter = false;
};

canShowGun(){
   return this.World.Keyboard.S;
};

canJump(){
   return this.World.Keyboard.UP && !this.isinAboveGround();
};

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
        if(!this.World.isMuted()){
            this.hurtSound.play();
            this.hurtSound.volume = 0.3;
            clearInterval(this.interval); 
        }
    }
}

};