class Character extends MovableObject {

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


    IMAGES_DEAD = [
        'img/pinguin/Character/Slide/Slide_0.png',
        'img/pinguin/Character/Slide/Slide_1.png',
        'img/pinguin/Character/Slide/Slide_2.png',
        'img/pinguin/Character/Slide/Slide_3.png',
        'img/pinguin/Character/Slide/Slide_4.png',
        'img/pinguin/Character/Slide/Slide_5.png',
        'img/pinguin/Character/Slide/Slide_6.png',
    ]

    IMAGES_HURT = [
        'img/pinguin/Character/Roll/Roll_0.png',
        'img/pinguin/Character/Roll/Roll_1.png',
        'img/pinguin/Character/Roll/Roll_2.png',
        'img/pinguin/Character/Roll/Roll_3.png',
        'img/pinguin/Character/Roll/Roll_4.png',
        'img/pinguin/Character/Roll/Roll_5.png',
    ]


    IMAGES_GUN = [
        'img/pinguin/Character/Gun/Gun_1.svg',
    ]

    World;
    currentImage = 0;
    speed = 10;
    walking_sound = new Audio('audio/walk.mp3');
    hurtSound = new Audio('audio/hit.wav');
    jumpSound = new Audio('audio/Jump.mp3');

    constructor() {
        super().loadImage('img/pinguin/Character/Walk/Walk_00.svg');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_GUN);
        this.applyGravity();
        this.animate();
    }

animate() {
    setInterval(() => {
        this.moveCharacter();
        this.hurtOreDadCharacter();
        this.World.camera_x = -this.x + 60;
    },300/60);

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
            this.World.checkGameEND();
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