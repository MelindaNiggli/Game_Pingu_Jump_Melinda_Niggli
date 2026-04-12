class gameWin extends DrawableObject {
    width = 1280;
    height = 650;

    constructor() {
        super();
        this.loadImage('img/ui/gameWin.svg');
        this.y = 0;
        this.x = -20;
    }
}