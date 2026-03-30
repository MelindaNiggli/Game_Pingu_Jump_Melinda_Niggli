class MonsterTurtle extends MovableObject{
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
  
    deathSound = new Audio('audio/hitTurtle.wav');

    currentImage = 0;

    constructor(){
        super().loadImage('img/monsters/turtle/Walk/Walk_00.png');
        this.y = 370;
        this.x = 200 + Math.random() * 7000; 
        this.width = 250;
        this.height = 230;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
      
        this.speed = 0.15 + Math.random() * 0.9;
        this.animate();
    }


    animate(){ 
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);
   
        setInterval(() => {
            this.playWalkingAnimationImages(this.IMAGES_WALKING);
        }, 50);  
    }

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
    
    stopAttack() {
        clearInterval(this.attackInterval); // Stoppt den Angriff
        this.isAttacking = false; // Setzt den Angriff-Status zurück
     
    }
}


// MONSTER FLY
class MonsterFly extends MovableObject{

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
    currentImage = 0;
    deathSound = new Audio('audio/monsterFlyDeath.mp3');
    constructor(){
        super().loadImage('img/monsters/skeleton-fly/Fly/skeleton-Fly_0.png');
        this.y = 200; 
        this.x = 200 + Math.random() * 7000; 
        this.width = 65;
        this.height = 90;
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 0.15 + Math.random() * 2;
        this.animate();
    }


    animate(){ // BILD WIRD IMMER AUSGETAUSCHT
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);
   
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_FLYING.length;
            let path = this.IMAGES_FLYING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 50);  
    }
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
    
    stopAttack() {
        clearInterval(this.attackInterval); 
        this.isAttacking = false; 
    }
}

class MonsterBomb extends MovableObject{

    IMAGES_WALKING = [
        'img/monsters/moster-bomb/Walk/Walk_00.png',
        'img/monsters/moster-bomb/Walk/Walk_01.png',
        'img/monsters/moster-bomb/Walk/Walk_02.png',
        'img/monsters/moster-bomb/Walk/Walk_03.png',
        'img/monsters/moster-bomb/Walk/Walk_04.png',
        'img/monsters/moster-bomb/Walk/Walk_05.png',
        'img/monsters/moster-bomb/Walk/Walk_06.png',
        'img/monsters/moster-bomb/Walk/Walk_07.png',
        'img/monsters/moster-bomb/Walk/Walk_08.png',
        'img/monsters/moster-bomb/Walk/Walk_09.png',
        'img/monsters/moster-bomb/Walk/Walk_10.png',
        'img/monsters/moster-bomb/Walk/Walk_11.png',
        'img/monsters/moster-bomb/Walk/Walk_12.png',
        'img/monsters/moster-bomb/Walk/Walk_13.png',
        'img/monsters/moster-bomb/Walk/Walk_14.png',
        'img/monsters/moster-bomb/Walk/Walk_15.png',
        'img/monsters/moster-bomb/Walk/Walk_16.png',
        'img/monsters/moster-bomb/Walk/Walk_17.png',
        'img/monsters/moster-bomb/Walk/Walk_18.png',
        'img/monsters/moster-bomb/Walk/Walk_19.png',
    ];
    IMAGES_ATTACK = [
        'img/monsters/moster-bomb/Throw/Throw_00.png',
        'img/monsters/moster-bomb/Throw/Throw_01.png',
        'img/monsters/moster-bomb/Throw/Throw_02.png',
        'img/monsters/moster-bomb/Throw/Throw_03.png',
        'img/monsters/moster-bomb/Throw/Throw_04.png',
        'img/monsters/moster-bomb/Throw/Throw_05.png',
        'img/monsters/moster-bomb/Throw/Throw_06.png',
        'img/monsters/moster-bomb/Throw/Throw_07.png',
        'img/monsters/moster-bomb/Throw/Throw_08.png',
        'img/monsters/moster-bomb/Throw/Throw_09.png',
        'img/monsters/moster-bomb/Throw/Throw_10.png',
        'img/monsters/moster-bomb/Throw/Throw_11.png',
        'img/monsters/moster-bomb/Throw/Throw_12.png',
        'img/monsters/moster-bomb/Throw/Throw_13.png',
        'img/monsters/moster-bomb/Throw/Throw_14.png',
        'img/monsters/moster-bomb/Throw/Throw_15.png',
        'img/monsters/moster-bomb/Throw/Throw_16.png',
        'img/monsters/moster-bomb/Throw/Throw_17.png',
        'img/monsters/moster-bomb/Throw/Throw_18.png',
        'img/monsters/moster-bomb/Throw/Throw_19.png',
        'img/monsters/moster-bomb/Throw/Throw_20.png',
        'img/monsters/moster-bomb/Throw/Throw_21.png',
        'img/monsters/moster-bomb/Throw/Throw_22.png',
        'img/monsters/moster-bomb/Throw/Throw_23.png',
        'img/monsters/moster-bomb/Throw/Throw_24.png',
        'img/monsters/moster-bomb/Throw/Throw_25.png',
        'img/monsters/moster-bomb/Throw/Throw_26.png',
        'img/monsters/moster-bomb/Throw/Throw_27.png',
        'img/monsters/moster-bomb/Throw/Throw_28.png',
        'img/monsters/moster-bomb/Throw/Throw_29.png',
        'img/monsters/moster-bomb/Throw/Throw_30.png',
        'img/monsters/moster-bomb/Throw/Throw_31.png',
        'img/monsters/moster-bomb/Throw/Throw_32.png',
        'img/monsters/moster-bomb/Throw/Throw_33.png',
        'img/monsters/moster-bomb/Throw/Throw_34.png',
        'img/monsters/moster-bomb/Throw/Throw_35.png',
        'img/monsters/moster-bomb/Throw/Throw_36.png',
        'img/monsters/moster-bomb/Throw/Throw_37.png',
        'img/monsters/moster-bomb/Throw/Throw_38.png',
        'img/monsters/moster-bomb/Throw/Throw_39.png',
    ];
    currentImage = 0;
    deathSound = new Audio('audio/enemyDeath.wav');
    constructor(){
        super().loadImage('img/monsters/moster-bomb/Walk/Walk_00.png');
        this.y = 350;
        this.x = 200 + Math.random() * 7000; 
        this.width = 260;
        this.height = 250;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 0.15 + Math.random() * 2.5;
        this.animate();
   
    }
    animate(){ 
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
     this.playWalkingAnimationImages(this.IMAGES_WALKING);
        },50);  
    }

    attack(character) {
        if (!this.isAttacking) {
            this.isAttacking = true; 
            
            this.attackInterval = setInterval(() => {
                this.playWalkingAnimationImages(this.IMAGES_ATTACK);
                if (!this.isColliding(character)) {
                    this.loadImage('img/monsters/moster-bomb/Walk/Walk_00.png');
                    this.stopAttack();
                }
            }, 1000 / 70);
        }
    }
    
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false; 
     
    }
}

class MonsterBlue extends MovableObject{

    IMAGES_WALKING = [
        'img/monsters/monster-blue/Walk/skeleton-Walk_0.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_1.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_2.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_3.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_4.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_5.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_6.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_7.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_8.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_9.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_10.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_11.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_12.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_13.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_14.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_15.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_16.png',
        'img/monsters/monster-blue/Walk/skeleton-Walk_17.png',
 
    ];
    IMAGES_ATTACK = [
        'img/monsters/monster-blue/Attack/skeleton-Attack_0.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_1.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_2.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_3.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_4.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_5.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_6.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_7.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_8.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_9.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_10.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_11.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_12.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_13.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_14.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_15.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_16.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_17.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_18.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_19.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_20.png',
        'img/monsters/monster-blue/Attack/skeleton-Attack_21.png',
    ];
    currentImage = 0;
    deathSound = new Audio('audio/enemyDeath.wav');
    constructor(){
        super().loadImage('img/monsters/moster-bomb/Walk/Walk_00.png');
        this.y = 350;
        this.x = 200 + Math.random() * 7000; 
        this.width = 230;
        this.height = 230;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 0.15 + Math.random() * 2.5;
        this.animate();
   
    }
    animate(){
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
     this.playWalkingAnimationImages(this.IMAGES_WALKING);
        },50);  
    }

    attack(character) {
        if (!this.isAttacking) { 
            this.isAttacking = true; // Angriff startet
            this.attackInterval = setInterval(() => {
                this.playWalkingAnimationImages(this.IMAGES_ATTACK);
                if (!this.isColliding(character)) {
                    this.loadImage('img/monsters/moster-bomb/Walk/Walk_00.png');
                    this.stopAttack(); 
                }
            }, 1000 / 70);
        }
    }
    
    stopAttack() {
        clearInterval(this.attackInterval);
        this.isAttacking = false;
    }
}