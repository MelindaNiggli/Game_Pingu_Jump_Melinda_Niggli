class Keyboard extends MovableObject {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    A = false;
    S = false;
    D = false;

    constructor() {
        super();
        this.keyPressevents();
        this.keyPresseventsMobile();
    }

    keyPressevents() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = true;
            }
            if (event.keyCode == 37) {
                this.LEFT = true;
            }
            if (event.keyCode == 38) {
                this.UP = true;
            }
            if (event.keyCode == 40) {
                this.DOWN = true;
            }
            if (event.keyCode == 32) {
                this.SPACE = true;
            }

            if (event.keyCode == 65) {
                this.A = true;
            }
            if (event.keyCode == 83) {
                this.S = true;
            }
            if (event.keyCode == 68) {
                this.D = true;
            }
            // console.log(event)
        })
        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = false;
            }
            if (event.keyCode == 37) {
                this.LEFT = false;
            }
            if (event.keyCode == 38) {
                this.UP = false;
            }
            if (event.keyCode == 40) {
                this.DOWN = false;
            }
            if (event.keyCode == 32) {
                this.SPACE = false;
            }
            if (event.keyCode == 65) {
                this.A = false;
            }
            if (event.keyCode == 83) {
                this.S = false;
            }
            if (event.keyCode == 68) {
                this.D = false;
            }
            // console.log(event)
        })
    };


    keyPresseventsMobile() {
        const btnRight = document.getElementById('btnRight');
        const btnLeft = document.getElementById('btnLeft');
        const btnUp = document.getElementById('btnUp');
        const btnThrow = document.getElementById('btnThrow');
        const btnShoot = document.getElementById('btnShoot');


        btnThrow.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.D = true;
        });

        btnThrow.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.D = false;
        });

        btnShoot.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.A = true;
            this.S = true;
        });

        btnShoot.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.A = false;
            this.S = false;
        });


        // Touchstart-Ereignisse
        btnRight.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.RIGHT = true;
        });

        btnLeft.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.LEFT = true;
        });
        btnUp.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.UP = true;
        });

        // Touchend-Ereignisse
        btnRight.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
        btnLeft.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
        btnUp.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.UP = false;
        });
    }
}