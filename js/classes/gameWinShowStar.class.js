class gameWinShowStar extends DrawableObject {
    width = 267;
    height = 136;
    currentImage = ''; 

    constructor() {
        super();
        this.loadImage('img/ui/noStar.svg'); 
        this.y = 900;
        this.x = 460;
    }

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
