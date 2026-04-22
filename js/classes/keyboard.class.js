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
        this._onKeyDown = (event) => this.handleKeyDown(event);
        this._onKeyUp = (event) => this.handleKeyUp(event);
        this.keyPressevents();
        this.keyPresseventsMobile();
    }

    /**
     * Sets input flags to `true` when a key is pressed.
     * @param {KeyboardEvent} event
     */
    handleKeyDown(event) {
        if (event.keyCode == 39) this.RIGHT = true;
        if (event.keyCode == 37) this.LEFT = true;
        if (event.keyCode == 38) this.UP = true;
        if (event.keyCode == 40) this.DOWN = true;
        if (event.keyCode == 32) this.SPACE = true;
        if (event.keyCode == 65) this.A = true;
        if (event.keyCode == 83) {
            if (!this.S) this.S_FIRED = true;
            this.S = true;
        }
        if (event.keyCode == 68) this.D = true;
    }

    /**
     * Sets input flags to `false` when a key is released.
     * @param {KeyboardEvent} event
     */
    handleKeyUp(event) {
        if (event.keyCode == 39) this.RIGHT = false;
        if (event.keyCode == 37) this.LEFT = false;
        if (event.keyCode == 38) this.UP = false;
        if (event.keyCode == 40) this.DOWN = false;
        if (event.keyCode == 32) this.SPACE = false;
        if (event.keyCode == 65) this.A = false;
        if (event.keyCode == 83) {
            this.S = false;
            this.S_FIRED = false;
        }
        if (event.keyCode == 68) this.D = false;
    }

    /**
     * Registers `keydown` and `keyup` listeners on the `window` object.
     */
    keyPressevents() {
        window.addEventListener("keydown", this._onKeyDown);
        window.addEventListener("keyup", this._onKeyUp);
    }

    /**
     * Removes all keyboard listeners cleanly.
     */
    destroy() {
        window.removeEventListener("keydown", this._onKeyDown);
        window.removeEventListener("keyup", this._onKeyUp);
    }

    /**
     * Registers touch controls for all mobile on-screen buttons.
     */
    keyPresseventsMobile() {
        const btnRight = document.getElementById('btnRight');
        const btnLeft = document.getElementById('btnLeft');
        const btnUp = document.getElementById('btnUp');
        const btnThrow = document.getElementById('btnThrow');
        const btnShoot = document.getElementById('btnShoot');
        this.TouchStartTouchEndBtnThrow(btnThrow);
        this.TouchStartTouchEndBtnShoot(btnShoot);
        this.TouchStartTouchEndBtnRight(btnRight);
        this.TouchStartTouchEndBtnLeft(btnLeft);
        this.TouchStartTouchEndBtnUp(btnUp);
    }

    /**
     * Registers touch events for the jump button.
     * @param {HTMLElement} btnUp
     */
    TouchStartTouchEndBtnUp(btnUp) {
        btnUp.addEventListener('touchstart', (event) => { event.preventDefault(); this.UP = true; });
        btnUp.addEventListener('touchend', (event) => { event.preventDefault(); this.UP = false; });
    }

    /**
     * Registers touch events for the throw button.
     * @param {HTMLElement} btnThrow
     */
    TouchStartTouchEndBtnThrow(btnThrow) {
        btnThrow.addEventListener('touchstart', (event) => { event.preventDefault(); this.D = true; });
        btnThrow.addEventListener('touchend', (event) => { event.preventDefault(); this.D = false; });
    }

    /**
     * Registers touch events for the right button.
     * @param {HTMLElement} btnRight
     */
    TouchStartTouchEndBtnRight(btnRight) {
        btnRight.addEventListener('touchstart', (event) => { event.preventDefault(); this.RIGHT = true; });
        btnRight.addEventListener('touchend', (event) => { event.preventDefault(); this.RIGHT = false; });
    }

    /**
     * Registers touch events for the left button.
     * @param {HTMLElement} btnLeft
     */
    TouchStartTouchEndBtnLeft(btnLeft) {
        btnLeft.addEventListener('touchstart', (event) => { event.preventDefault(); this.LEFT = true; });
        btnLeft.addEventListener('touchend', (event) => { event.preventDefault(); this.LEFT = false; });
    }

    /**
     * Registers touch events for the shoot button.
     * @param {HTMLElement} btnShoot
     */
    TouchStartTouchEndBtnShoot(btnShoot) {
        btnShoot.addEventListener('touchstart', (event) => { event.preventDefault(); this.A = true; this.S = true; });
        btnShoot.addEventListener('touchend', (event) => { event.preventDefault(); this.A = false; this.S = false; });
    }
}
