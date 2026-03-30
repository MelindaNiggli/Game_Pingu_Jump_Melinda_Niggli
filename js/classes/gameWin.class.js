class gameWin extends DrawableObject {
    width = 1280;
    height = 650;
    currentImage = 0;
    winSound = new Audio('audio/Win.wav');

    constructor() {
        super();
        this.loadImage('img/ui/gameWin.svg');
        this.y = 0;
        this.x = -20;
    }

    playSound() {
        this.winSound.currentTime = 0; // von vorne starten
        this.winSound.play().catch(e => console.log("Audio blockiert:", e));
    }
}
