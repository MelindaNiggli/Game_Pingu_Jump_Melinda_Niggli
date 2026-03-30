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
        if (!gameWIN) return; // Funktion verlassen, wenn das Spiel nicht gewonnen ist

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

        // Nur aktualisieren, wenn das neue Bild anders ist als das aktuelle
        if (newImage && newImage !== this.currentImage) {
            this.currentImage = newImage; 
            this.loadImage(newImage); 
            this.y = 70;
            this.x = 460;
        }
    }
}
