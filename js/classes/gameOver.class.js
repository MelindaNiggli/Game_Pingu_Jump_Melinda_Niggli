class gameOver extends DrawableObject{
    width = 1280;
    height = 650;
    currentImage = 0;
    gameOverSound = new Audio('audio/gameOver.mp3');

    constructor(){
        super();
        this.loadImage('img/ui/gameOver.svg')
        this.y = 0;
        this.x = -20;      
    }    
    playSound() {
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.play().catch(e => console.log("Audio blockiert:", e));
    }
}

