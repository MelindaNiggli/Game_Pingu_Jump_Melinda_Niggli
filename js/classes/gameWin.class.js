class gameWin extends DrawableObject {
    width = 1280;
    height = 650;

    /**
     * Creates a new Game Win screen instance.
     * Loads the victory image and sets its position.
     */
    constructor() {
        super();
        this.loadImage('img/ui/gameWin.svg');
        this.y = 0;
        this.x = -20;
    }
}