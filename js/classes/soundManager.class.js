class SoundManager {

    /** Creates sound manager, loads audio assets and applies mute state. */
    constructor() {
        this.muted = localStorage.getItem("muted") === "true";
        this.sounds = {
            hitTurtle: new Audio('audio/monsterFlyDeath.mp3'),
            character_walking_sound: new Audio('audio/walk.mp3'),
            characterhurtSound: new Audio('audio/hit.wav'),
            character_jumpSound: new Audio('audio/Jump.mp3'),
            gameOverSound: new Audio('audio/GameOver.mp3'),
            winSound: new Audio('audio/Win.wav'),
            throw_sound: new Audio('audio/Throw.mp3'),
            shoot_sound: new Audio('audio/Shoot.mp3'),
            chestSound: new Audio('audio/magicChest.mp3'),
            starSound: new Audio('audio/Star.mp3'),
            crystalSound: new Audio('audio/crystal.mp3')
        };

        this.sounds.hitTurtle.volume = 0.4;
        this.sounds.characterhurtSound.volume = 0.1;
        this.sounds.throw_sound.volume = 0.3;
        this.sounds.shoot_sound.volume = 0.1;
        this.sounds.gameOverSound.volume = 0.2;
        this.sounds.winSound.volume = 0.2;
        this.sounds.starSound.volume = 0.3;
        this.sounds.crystalSound.volume = 0.3;
        this.music = new Audio('audio/backgroundMusic.wav');
        this.music.loop = true;
        this.music.volume = 0.1;
        this.EndbossMusic = new Audio('audio/angry.mp3');
        this.EndbossMusic.loop = true;
        this.EndbossMusic.volume = 0.9;
        this.applyMuteState();
    }

    /** Plays a sound effect by key. */
    play(key) {
        if (this.muted || !this.sounds[key]) return;
        const sound = this.sounds[key].cloneNode();
        sound.volume = this.sounds[key].volume;
        sound.muted = this.muted;
        sound.play().catch(() => {});
    }

    /** Plays background music. */
    playMusic() {
        if (this.muted) return;
        this.music.currentTime = 0;
        this.music.play().catch(() => {});
    }

    /** Plays endboss music. */
    playMusicEndbossMusic() {
        if (this.muted) return;
        this.EndbossMusic.currentTime = 0;
        this.EndbossMusic.play().catch(() => {});
    }

    /** Stops a single sound effect. */
    stop(key) {
        const sound = this.sounds[key];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /** Stops all sounds and music. */
    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });

        this.stopMusic();
        this.stopEndbossMusic();
    }

    /** Stops background music. */
    stopMusic() {
        this.music.pause();
        this.music.currentTime = 0;
    }

    /** Stops endboss music. */
    stopEndbossMusic() {
        this.EndbossMusic.pause();
        this.EndbossMusic.currentTime = 0;
    }

    /** Resets sound system state. */
    reset() {
        this.stopAll();
        this.muted = localStorage.getItem("muted") === "true";
        this.applyMuteState();
    }

    /** Sets mute state and stores it in localStorage. */
    setMuted(muted) {
        this.muted = muted;
        localStorage.setItem("muted", muted);
        this.applyMuteState();
        if (muted) {
            this.stopAll();
        }
    }

    /** Applies mute state to all sounds. */
    applyMuteState() {
        Object.values(this.sounds).forEach(sound => {
            sound.muted = this.muted;
        });
    }

    /** Returns current mute state. */
    isMuted() {
        return this.muted;
    }
}