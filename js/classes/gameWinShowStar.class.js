class gameWinShowStar extends DrawableObject {

    width = 267;
    height = 136;

    currentImage = '';

    /**
     * Creates the star UI element.
     * Initializes default "no star" image and position.
     */
    constructor() {
        super();
        this.loadImage('img/ui/noStar.svg');
        this.y = 900;
        this.x = 460;
    }

    /**
     * Updates the star display based on game win state and collected stars.
     *
     * @param {boolean} gameWIN - Whether the game is won
     * @param {number} haveStar - Amount of collected stars
     */
    check(gameWIN, haveStar) {
        if (!gameWIN) return;

        let newImage = '';

        if (haveStar > 80) {
            newImage = 'img/ui/threeStars.svg';
        } else if (haveStar > 50) {
            newImage = 'img/ui/twoStars.svg';
        } else if (haveStar > 30) {
            newImage = 'img/ui/oneStar.svg';
        } else if (haveStar > 10) {
            newImage = 'img/ui/noStar.svg';
        }

        if (newImage && newImage !== this.currentImage) {
            this.currentImage = newImage;
            this.loadImage(newImage);
            this.y = 70;
            this.x = 460;
        }
    }
}