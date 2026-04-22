const width = 300;
const height = 30;

class StatusBar extends DrawableObject {
    IMAGES = [
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

    THRESHOLDS = [
        [100, 10],
        [90,   9],
        [81,   8],
        [72,   7],
        [63,   6],
        [54,   5],
        [45,   4],
        [36,   3],
        [27,   2],
        [18,   1],
        [0,    0],
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10; this.y = 20;
        this.width = width; this.height = height;
        this.setPercentage(100);
    }
}

class StatusBarEndBoss extends DrawableObject {
    IMAGES = [
        'img/statusbar/turtle/TurtleHeart_0.svg',
        'img/statusbar/turtle/TurtleHeart_1.svg',
        'img/statusbar/turtle/TurtleHeart_2.svg',
        'img/statusbar/turtle/TurtleHeart_3.svg',
        'img/statusbar/turtle/TurtleHeart_4.svg',
        'img/statusbar/turtle/TurtleHeart_5.svg',
        'img/statusbar/turtle/TurtleHeart_6.svg',
        'img/statusbar/turtle/TurtleHeart_7.svg',
        'img/statusbar/turtle/TurtleHeart_8.svg',
    ];

    THRESHOLDS = [
        [100,  0],
        [87.5, 1],
        [75,   2],
        [62.5, 3],
        [50,   4],
        [37.5, 5],
        [25,   6],
        [12.5, 7],
        [0,    8],
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 340; this.y = 20;
        this.width = width; this.height = 80;
        this.setPercentage(100);
    }
}

class StatusBarStar extends DrawableObject {
    IMAGES = [
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

    THRESHOLDS = [
        [85, 9],
        [70, 8],
        [60, 7],
        [50, 6],
        [40, 5],
        [30, 4],
        [20, 3],
        [10, 2],
        [1,  1],
        [0,  0],
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10; this.y = 55;
        this.width = width; this.height = 32;
        this.setPercentage(0);
    }
}

class StatusBarCrystal extends DrawableObject {
    IMAGES = [
        'img/statusbar/diamant/diamant-1.svg',
        'img/statusbar/diamant/diamant-2.svg',
        'img/statusbar/diamant/diamant-3.svg',
        'img/statusbar/diamant/diamant-4.svg',
        'img/statusbar/diamant/diamant-5.svg',
        'img/statusbar/diamant/diamant-6.svg',
        'img/statusbar/diamant/diamant-7.svg',
        'img/statusbar/diamant/diamant-8.svg',
        'img/statusbar/diamant/diamant-9.svg',
        'img/statusbar/diamant/diamant-10.svg',
    ];

    THRESHOLDS = [
        [85, 9],
        [70, 8],
        [60, 7],
        [50, 6],
        [40, 5],
        [30, 4],
        [20, 3],
        [10, 2],
        [1,  1],
        [0,  0],
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10; this.y = 100;
        this.width = width; this.height = 38;
        this.setPercentage(0);
    }
}

class StatusBarFish extends DrawableObject {
    IMAGES = [
        'img/statusbar/fish/5.svg',
        'img/statusbar/fish/4.svg',
        'img/statusbar/fish/3.svg',
        'img/statusbar/fish/2.svg',
        'img/statusbar/fish/1.svg',
        'img/statusbar/fish/0.svg'
    ];

    directIndex = true; 
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 1110; this.y = 30;
        this.width = 70; this.height = 70;
        this.setPercentage(0);
    }
}

class StatusBarGun extends DrawableObject {
    World;
    IMAGES = [
        'img/statusbar/gun/5.svg',
        'img/statusbar/gun/4.svg',
        'img/statusbar/gun/3.svg',
        'img/statusbar/gun/2.svg',
        'img/statusbar/gun/1.svg',
        'img/statusbar/gun/0.svg'
    ];

    directIndex = true;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 1030; this.y = 30;
        this.width = 70; this.height = 70;
        this.setPercentage(0);
    }
}