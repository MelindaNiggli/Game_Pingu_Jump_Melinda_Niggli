let canvas;
let world;
let keyboard;

/* INIT & GAME */

function init() {
    keyboard = new Keyboard();
    initLevel();
    checkOrientation();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // console.log('World initialized:', world);
};

function playGame() {
    if (world) {
        world.stopGame();   
        world = null;  
    }

    const canvasInnerWrapper = document.getElementById('canvasInnerWrapper');
    canvasInnerWrapper.style.transform = 'translateY(-1000%)';

    init(); // neue World erstellen

    const canvasWrapper = document.getElementById('canvasWrapper');
    canvasWrapper.classList.add('playnow');
    canvasWrapper.style.display = 'flex'; // sicherstellen, dass es sichtbar ist

    setTimeout(() => {
        canvasInnerWrapper.style.transform = 'translateY(0)';
    }, 1);
}

/* OVERLAYS / UI */

function openInfo() {
    document.querySelector('.ui.info').classList.add('active');
    document.getElementById('welcomeUi').style.display = "none";
    document.getElementById('ui').style.display = "none";
    document.querySelector('.overlay').classList.add('active');
};

function closeOverlay() {
    document.getElementById('ui').style.display = "flex";
    document.getElementById('welcomeUi').style.display = "flex";

    document.querySelector('.ui.info').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
};

function showImpressum() {
    const impressum = document.getElementById('innerTextImpressum');
    const startText= document.getElementById('startText');
    const button = document.getElementById('buttonImpressum');

    const active = impressum.classList.toggle('active');
    startText.classList.toggle('active');
    button.innerText = active ? "Back" : "Impressum";

};

/* Mute BTN */

function toggleMute() {
    const button = document.getElementById('muteBtn');

    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        button.innerHTML = `<img style="height: 24px;" src="./img/ui/Mute.svg" alt="mute off icon">`;
        localStorage.setItem("muted", "true");
        world.stopBackgroundMusic();
    } else {
        button.innerHTML = `<img style="height: 24px;" src="./img/ui/Mute_Off.svg" alt="mute off icon">`;
        localStorage.setItem("muted", "false");
        world.startBackgroundMusic();
    };
};

/* FULLSCREEN (DESKTOP + iOS) */

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

function openFullscreen() {
    const wrapper = document.getElementById('canvasWrapper');
    enterFullscreen(wrapper);
   
};

function closeFullscreen() {
    exitFullscreen();

};

function enterFullscreen(element) {
    element.classList.add("fullscreen-ON");
    if (!isIOS() && element.requestFullscreen) {
        element.requestFullscreen();

    } else {
        element.classList.add("fullscreen-mobile");
        document.body.style.overflow = "hidden";
        
    };

    document.getElementById('openFullscreen').style.display = "none";
    document.getElementById('closeFullscreen').style.display = "flex";
};

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    };

    document.getElementById('canvasWrapper').classList.remove("fullscreen-mobile");
    document.getElementById('canvasWrapper').classList.remove("fullscreen-ON");
    document.body.style.overflow = "";
};

/* Desktop ESC / Android */
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.getElementById('closeFullscreen').style.display = "none";
        document.getElementById('openFullscreen').style.display = "flex";

    };
});

/* NAVIGATION */

function loadDash() {
    document.getElementById('ui').style.transform = 'translateY(0)';
};

function goHome() {
    if (world) {
        world.stopGame();   // entfernt alle Animationen, Timer, Events 
    }

    const canvasWrapper = document.getElementById('canvasWrapper');
    if (canvasWrapper) {
        canvasWrapper.style.display = 'none';
    }
    const ui = document.getElementById('ui');
    const welcome = document.getElementById('welcomeUi');
    if (ui) ui.style.display = "flex";
    if (welcome) welcome.style.display = "flex";

    // localStorage.setItem("muted", "false");

    console.log("Spiel gestoppt und Canvas ausgeblendet.");
}
/* CANVAS / ORIENTATION */

function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

function checkOrientation() {
    const canvas = document.getElementById('canvas');
    const wrapper = document.getElementById('canvasWrapper');

    if (wrapper.classList.contains('fullscreen-mobile')) {
        canvas.style.height = '90dvh';
        return;
    };

    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 450) {
            canvas.style.height = `${window.innerHeight}px`;
        };
    } else {
        canvas.style.height = '70%';
        canvas.style.width = '100%';
    };
};

window.addEventListener('resize', () => {
    checkOrientation();
});