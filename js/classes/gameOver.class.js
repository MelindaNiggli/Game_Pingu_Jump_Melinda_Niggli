class gameOver extends DrawableObject {
    width = 1280;
    height = 650;
    soundPlayed = false;

    constructor() {
        super();
        this.loadImage('img/ui/gameOver.svg');
        this.y = 0;
        this.x = -20;
    }
}