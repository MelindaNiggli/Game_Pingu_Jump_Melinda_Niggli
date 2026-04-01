class endBossTurtle extends MovableObject{
    World;
    width = 480;
    height = 580;
    
    IMAGES_WALKING = [
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


    deathSound = new Audio('audio/enemyDeath.wav');
    currentImage = 0;

    constructor(){
        super().loadImage('img/monsters/endboss_turtle/Attack/Attack_00.png');
        this.y = 80;
        this.x = 6800;  
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.startIdle();
    }

    startIdle() {
        this.idleInterval = setInterval(() => {
            if (!this.isAttacking) {
                this.playWalkingAnimationImages(this.IMAGES_WALKING);
            }
        }, 1000 / 60); 
    }

    playSound() {
        if(!this.World.isMuted()){
            this.deathSound.play();
        } 
    }

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
        }else{
        }
    }
    
    stopAttack() {
        clearInterval(this.attackInterval); 
        this.isAttacking = false; 
     
    }
    
}