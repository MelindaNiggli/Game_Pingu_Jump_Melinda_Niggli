class gameOver extends DrawableObject {
    width = 1280;
    height = 650;
    soundPlayed = false;

    /**
     * Creates a new Game Over screen instance.
     * Loads the Game Over image and sets its position.
     */
    constructor() {
        super();
        this.loadImage('img/ui/gameOver.svg');
        this.y = 0;
        this.x = -20;
    }
}