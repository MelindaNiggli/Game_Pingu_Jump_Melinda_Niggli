const width = 300;
const height = 30;

class StatusBar extends DrawableObject {
    IMAGES_BAR_HEART = [
        'img/statusbar/herz/herz-0.svg',
        'img/statusbar/herz/herz-1.svg',
        'img/statusbar/herz/herz-2.svg',
        'img/statusbar/herz/herz-3.svg',
        'img/statusbar/herz/herz-4.svg',
        'img/statusbar/herz/herz-5.svg',
        'img/statusbar/herz/herz-6.svg',
        'img/statusbar/herz/herz-7.svg',
        'img/statusbar/herz/herz-8.svg',
        'img/statusbar/herz/herz-9.svg',
        'img/statusbar/herz/herz-10.svg',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR_HEART);
        this.x = 10;
        this.y = 20;
        this.width = width;
        this.height = height;
        this.setPercentage(100);
    }
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR_HEART[this.resoloveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resoloveImagesIndex() {
        if (this.percentage >= 100) {
            return 10;
        } else if (this.percentage > 90) {
            return 9;
        } else if (this.percentage > 81) {
            return 8;
        } else if (this.percentage > 72) {
            return 7;
        } else if (this.percentage > 63) {
            return 6;
        } else if (this.percentage > 54) {
            return 5;
        } else if (this.percentage > 45) {
            return 4;
        } else if (this.percentage > 36) {
            return 3;
        } else if (this.percentage > 27) {
            return 2;
        } else if (this.percentage > 18) {
            return 1;
        } else {
            return 0;
        }
    }
}


class StatusBarEndBoss extends DrawableObject {
    IMAGES_BAR_ENDBOSS = [
        'img/statusbar/turtle/TurtleHeart_0.svg',
        'img/statusbar/turtle/TurtleHeart_1.svg',
        'img/statusbar/turtle/TurtleHeart_2.svg',
        'img/statusbar/turtle/TurtleHeart_3.svg',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR_ENDBOSS);
        this.x = 340;
        this.y =  20;
        this.width = width;
        this.height = 80;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR_ENDBOSS[this.resoloveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resoloveImagesIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage > 70) {
            return 1;
        } else if (this.percentage > 30) {
            return 2;
        } else if (this.percentage > 0) {
            return 3;
        }
    }
}


class StatusBarStar extends DrawableObject {
    IMAGES_BAR_STAR = [
        'img/statusbar/stern/stern-0.svg',
        'img/statusbar/stern/stern-1.svg',
        'img/statusbar/stern/stern-2.svg',
        'img/statusbar/stern/stern-3.svg',
        'img/statusbar/stern/stern-4.svg',
        'img/statusbar/stern/stern-5.svg',
        'img/statusbar/stern/stern-6.svg',
        'img/statusbar/stern/stern-7.svg',
        'img/statusbar/stern/stern-8.svg',
        'img/statusbar/stern/stern-9.svg',
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR_STAR);
        this.x = 10;
        this.y = 100;
        this.width = width;
        this.height =  32;

        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR_STAR[this.resoloveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resoloveImagesIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 10) {
            return 1;
        } else if (this.percentage < 20) {
            return 2;
        } else if (this.percentage <30) {
            return 3;
        } else if (this.percentage < 40) {
            return 4;
        } else if (this.percentage < 50) {
            return 5;
        } else if (this.percentage < 60) {
            return 6;
        } else if (this.percentage < 70) {
            return 7;
        } else if (this.percentage < 90) {
            return 8;
        } else if (this.percentage < 95) {
            return 9;
        } else {
            return 0;
        }
    }
}


class StatusBarCrystal extends DrawableObject {
    IMAGES_BAR_CRYSTAL = [
        'img/statusbar/diamant/diamant-0.svg',
        'img/statusbar/diamant/diamant-1.svg',
        'img/statusbar/diamant/diamant-2.svg',
        'img/statusbar/diamant/diamant-3.svg',
        'img/statusbar/diamant/diamant-4.svg',
        'img/statusbar/diamant/diamant-5.svg',
        'img/statusbar/diamant/diamant-6.svg',
        'img/statusbar/diamant/diamant-7.svg',
        'img/statusbar/diamant/diamant-8.svg',
        'img/statusbar/diamant/diamant-9.svg',
        
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR_CRYSTAL);
        this.x = 10;
        this.y = 60;
        this.width = width;
        this.height = 34;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR_CRYSTAL[this.resoloveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resoloveImagesIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 10) {
            return 1;
        } else if (this.percentage < 20) {
            return 2;
        } else if (this.percentage <30) {
            return 3;
        } else if (this.percentage < 40) {
            return 4;
        } else if (this.percentage < 50) {
            return 5;
        } else if (this.percentage < 60) {
            return 6;
        } else if (this.percentage < 70) {
            return 7;
        } else if (this.percentage < 90) {
            return 8;
        } else if (this.percentage < 95) {
            return 9;
        } else {
            return 0;
        }
    }
}


class StatusBarFish extends DrawableObject {
    IMAGES_BAR_FISH = [
        'img/statusbar/fish/13.svg',
        'img/statusbar/fish/12.svg',
        'img/statusbar/fish/11.svg',
        'img/statusbar/fish/10.svg',
        'img/statusbar/fish/9.svg',
        'img/statusbar/fish/8.svg',
        'img/statusbar/fish/7.svg',
        'img/statusbar/fish/6.svg',
        'img/statusbar/fish/5.svg',
        'img/statusbar/fish/4.svg',
        'img/statusbar/fish/3.svg',
        'img/statusbar/fish/2.svg',
        'img/statusbar/fish/1.svg',
        'img/statusbar/fish/0.svg'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR_FISH);
        this.x = 1080;
        this.y = 30;
        this.width = 70;
        this.height = 70;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR_FISH[this.resoloveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resoloveImagesIndex() {
        if (this.percentage == 1) {
            return 1;
        } else if (this.percentage == 2) {
            return 1;
        } else if (this.percentage == 3) {
            return 2;
        } else if (this.percentage == 4) {
            return 3;
        } else if (this.percentage == 5) {
            return 4;
        } else if (this.percentage == 6) {
            return 5;
        } else if (this.percentage == 7) {
            return 6;
        } else if (this.percentage == 8) {
            return 7;
        } else if (this.percentage == 9) {
            return 8;
        } else if (this.percentage == 10) {
            return 9;
        } else if (this.percentage == 11) {
            return 10;
        } else if (this.percentage == 12) {
            return 11;
        } else if (this.percentage == 13) {
            return 13;
        } else {
            return 0;
        }
    }
}


class StatusBarGun extends DrawableObject {
    IMAGES_BAR_GUN = [
        'img/statusbar/gun/13.svg',
        'img/statusbar/gun/12.svg',
        'img/statusbar/gun/11.svg',
        'img/statusbar/gun/10.svg',
        'img/statusbar/gun/9.svg',
        'img/statusbar/gun/8.svg',
        'img/statusbar/gun/7.svg',
        'img/statusbar/gun/6.svg',
        'img/statusbar/gun/5.svg',
        'img/statusbar/gun/4.svg',
        'img/statusbar/gun/3.svg',
        'img/statusbar/gun/2.svg',
        'img/statusbar/gun/1.svg',
        'img/statusbar/gun/0.svg'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR_GUN);
        this.x = 980;
        this.y = 30;
        this.width = 70;
        this.height = 70;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR_GUN[this.resoloveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resoloveImagesIndex() {
        if (this.percentage == 1) {
            return 1;
        } else if (this.percentage == 2) {
            return 1;
        } else if (this.percentage == 3) {
            return 2;
        } else if (this.percentage == 4) {
            return 3;
        } else if (this.percentage == 5) {
            return 4;
        } else if (this.percentage == 6) {
            return 5;
        } else if (this.percentage == 7) {
            return 6;
        } else if (this.percentage == 8) {
            return 7;
        } else if (this.percentage == 9) {
            return 8;
        } else if (this.percentage == 10) {
            return 9;
        } else if (this.percentage == 11) {
            return 10;
        } else if (this.percentage == 12) {
            return 11;
        } else if (this.percentage == 13) {
            return 13;
        } else {
            return 0;
        }
    }
}