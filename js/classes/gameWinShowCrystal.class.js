class gameWinShowCrystal extends DrawableObject {
    width = 263;
    height = 86;
    currentImage = ''; 

    constructor() {
        super();
        this.loadImage('img/ui/noCrystal.svg'); // Startzustand
        this.y = 900;
        this.x = 460;
    }

    checkNow(gameWIN, haveCrystal) {
        if (!gameWIN) return;
        let newImage = '';

        if (haveCrystal > 80) {
            newImage = 'img/ui/threeCrystal.svg';
        } else if (haveCrystal > 50) {
            newImage = 'img/ui/twoCrystal.svg';
        } else if (haveCrystal > 30) {
            newImage = 'img/ui/oneCrystal.svg';
        } else if (haveCrystal > 10) {
            newImage = 'img/ui/noCrystal.svg';
        }
        if (newImage && newImage !== this.currentImage) {
            this.currentImage = newImage; // Aktualisiere den aktuellen Zustand
            this.loadImage(newImage); 
            this.y = 450; 
            this.x = 460;
        }
    }
}
