let canvas;
let world;
let keyboard;

/**
 * Initializes the game and creates a new world instance.
 * If a world already exists, it stops its intervals and background music first.
 */
function init() {
    if (world) {
        world.clearIntervallAndStopBackgroundMusic();
    }
    if (world && world.keyboard) world.keyboard.destroy();
    keyboard = new Keyboard();
    initLevel();
    handleOrientationChange();
    checkOrientation();

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Starts or restarts the game and handles UI transitions.
 */
function isPortraitMobile() {
    return window.matchMedia("(pointer: coarse) and (orientation: portrait)").matches;
}

function handleOrientationChange() {
    if (isPortraitMobile()) {
        document.getElementById("flipScreeen").style.display = "flex";
        if (world) {
            world.stopDraw();

        }
    } else {
        document.getElementById("flipScreeen").style.display = "none";
        if (world) {
            world.start();
            world.startBackgroundMusic();
        }
    }
}

window.addEventListener('resize', () => {
    checkOrientation();
    handleOrientationChange();
});

window.addEventListener('orientationchange', handleOrientationChange);


function playGame() {
    if (isPortraitMobile()) {
        document.getElementById("flipScreeen").style.display = "flex";
        clearIntervallAndStopBackgroundMusic();
        return;
    }
    const canvasInnerWrapper = document.getElementById('canvasInnerWrapper');
    canvasInnerWrapper.style.transform = 'translateY(-1000%)';

    if (world) {
        resetGame();
    } else {
        init();
    }

    initMuteState();

    const canvasWrapper = document.getElementById('canvasWrapper');
    canvasWrapper.classList.add('playnow');
    canvasWrapper.style.display = 'flex';

    setTimeout(() => {
        canvasInnerWrapper.style.transform = 'translateY(0)';
    }, 1);
}


/**
 * Opens info overlay.
 */
function openInfo() {
    document.querySelector('.ui.info').classList.add('active');
    document.getElementById('welcomeUi').style.display = "none";
    document.getElementById('ui').style.display = "none";
    document.querySelector('.overlay').classList.add('active');
}

/**
 * Closes overlay and restores UI.
 */
function closeOverlay() {
    document.getElementById('ui').style.display = "flex";
    document.getElementById('welcomeUi').style.display = "flex";

    document.querySelector('.ui.info').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
}

/**
 * Toggles impressum view.
 */
function showImpressum() {
    const impressum = document.getElementById('innerTextImpressum');
    const startText = document.getElementById('startText');
    const button = document.getElementById('buttonImpressum');

    const active = impressum.classList.toggle('active');
    startText.classList.toggle('active');
    button.innerText = active ? "Back" : "Impressum";
}

/**
 * Initializes mute state from localStorage.
 */
function initMuteState() {
    const button = document.getElementById('muteBtn');
    const isMuted = localStorage.getItem("muted") === "true";

    if (isMuted) {
        button.classList.add('active');
        button.innerHTML = `<img style="height: 24px;" src="./img/ui/Mute.svg" alt="mute icon">`;
        world.stopBackgroundMusic();
    } else {
        button.classList.remove('active');
        button.innerHTML = `<img style="height: 24px;" src="./img/ui/Mute_Off.svg" alt="mute off icon">`;
        world.startBackgroundMusic();
    }
}

/**
 * Toggles mute state.
 */
function toggleMute() {
    const button = document.getElementById('muteBtn');
    const isMuted = !button.classList.contains('active');
    button.classList.toggle('active');

    if (isMuted) {
        button.innerHTML = `<img style="height: 24px;" src="./img/ui/Mute.svg">`;
        world.soundManager.setMuted(true);
        world.soundManager.stopAll();
    } else {
        button.innerHTML = `<img style="height: 24px;" src="./img/ui/Mute_Off.svg">`;
        world.soundManager.setMuted(false);

        if (!world.gameEnd && !world.gameWIN) {
            world.soundManager.playMusic('backgroundMusic');
        }
    }
}

/**
 * Checks if device is iOS.
 */
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Enters fullscreen mode.
 */
function openFullscreen() {
    const wrapper = document.getElementById('canvasWrapper');
    enterFullscreen(wrapper);
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
    exitFullscreen();
}

/**
 * Requests fullscreen for element.
 */
function enterFullscreen(element) {
    element.classList.add("fullscreen-ON");

    if (!isIOS() && element.requestFullscreen) {
        element.requestFullscreen();
    } else {
        element.classList.add("fullscreen-mobile");
        document.body.style.overflow = "hidden";
    }

    document.getElementById('openFullscreen').style.display = "none";
    document.getElementById('closeFullscreen').style.display = "flex";
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }

    document.getElementById('canvasWrapper').classList.remove("fullscreen-mobile");
    document.getElementById('canvasWrapper').classList.remove("fullscreen-ON");
    document.body.style.overflow = "";
}

/**
 * Fullscreen change listener.
 */
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.getElementById('closeFullscreen').style.display = "none";
        document.getElementById('openFullscreen').style.display = "flex";
    }
});

/**
 * Shows main dashboard UI.
 */
function loadDash() {
    document.getElementById('ui').style.transform = 'translateY(0)';
}

/**
 * Returns to home screen and stops game.
 */
function goHome() {
    if (world) {
        clearIntervallAndStopBackgroundMusic();
        world.soundManager.stopAll();
        world.stopDraw();
    }

    const canvasWrapper = document.getElementById('canvasWrapper');
    if (canvasWrapper) {
        canvasWrapper.style.display = "none";
    }

    const ui = document.getElementById('ui');
    const welcome = document.getElementById('welcomeUi');

    if (ui) ui.style.display = "flex";
    if (welcome) welcome.style.display = "flex";
}

/**
 * Resizes canvas to full screen.
 */
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Adjusts canvas based on orientation.
 */
function checkOrientation() {
    const canvas = document.getElementById('canvas');
    const wrapper = document.getElementById('canvasWrapper');

    if (wrapper.classList.contains('fullscreen-mobile')) {
        canvas.style.height = '90dvh';
        return;
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 450) {
            canvas.style.height = `${window.innerHeight}px`;
        }
    } else {
        canvas.style.height = '70%';
        canvas.style.width = '100%';
    }
}



function clearIntervallAndStopBackgroundMusic() {
    world.soundManager.reset();
    world.intervalIds.forEach(id => clearInterval(id));
    world.intervalIds = [];
    world.clearAllChestIntervalls();
    world.clearAllIntervallCharacter();
    world.character.stopIntervalGravity();
    world.character.resetMovableObject();
    cancelAnimationFrame(world.requestId);
    world.requestId = null;
    world.GunShoot.forEach(shoot => shoot.stop());
    world.GunShootL.forEach(shoot => shoot.stop());
    world.ThrowableObjects.forEach(obj => obj.stop());
    world.ThrowableObjectsL.forEach(obj => obj.stop());
    world.GunShoot = [];
    world.GunShootL = [];
    world.ThrowableObjects = [];
    world.ThrowableObjectsL = [];
    if (world.level && world.level.clouds) {
        world.level.clouds.forEach(cloud => {
            if (cloud.stopCloud) cloud.stopCloud();
        });
    }

    if (world.level && world.level.endboss) {
        world.level.endboss.forEach(endboss => {
            if (endboss.stop) endboss.stop();
        });
    }

    if (world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy.stop) enemy.stop();
        });
    }
}

function resetGame() {
    if (world.keyboard) world.keyboard.destroy();
    world.stopDraw();
    clearIntervallAndStopBackgroundMusic();
    world.gameWIN = false;
    world.gameEnd = false;
    world.deadEndboss = false;
    world.gameWinSoundPlayed = false;
    world.gameOverSoundPlayed = false;
    world.lastShootTime = 0;
    world.lastThrowTime = 0;
    world.shootCooldown = 300;
    world.throwCooldown = 300;
    world.shootTimeouts = [];
    world.endbossTriggerX = 5000;
    world.endbossStopX = 5500;
    world.GunShoot = [];
    world.GunShootL = [];
    world.ThrowableObjects = [];
    world.ThrowableObjectsL = [];
    if (world.character) world.character.stop();
    world.character = new Character();
    world.level = initLevel();
    world.statusBar = new StatusBar();
    world.statusBarStar = new StatusBarStar();
    world.statusBarCrystal = new StatusBarCrystal();
    world.statusBarFish = new StatusBarFish();
    world.statusBarGun = new StatusBarGun();
    world.StatusBarEndBoss = new StatusBarEndBoss();
    world.gameWinShowStar = new gameWinShowStar();
    world.gameWinShowCrystal = new gameWinShowCrystal();
    world.keyboard = new Keyboard();
    world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
    world.setWorld();
    world.start();
    world.intervalIds.push(
        setInterval(() => {
            world.CheckColisionsAndThrowObjects();
            world.CheckThrow();
            world.checkCollisionPlatform();
        }, 1000 / 60)
    );
    world.level.enemies.forEach(enemy => enemy.animate());
}