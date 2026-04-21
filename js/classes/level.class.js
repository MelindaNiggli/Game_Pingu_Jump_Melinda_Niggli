class Levels {
    clouds;
    enemies;
    endboss;
    chest;
    backgroundObjects;
    platform;
    stars;
    crystal;
    level_end_x = 7450;

    /**
     * Creates a new level instance with all game objects.
     *
     * @param {Array} clouds
     * @param {Array} enemies
     * @param {Array} endboss
     * @param {Array} chest
     * @param {Array} backgroundObjects
     * @param {Array} platform
     * @param {Array} stars
     * @param {Array} crystal
     */
    constructor(clouds, enemies, endboss, chest, backgroundObjects, platform, stars, crystal) {
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.chest = chest;
        this.backgroundObjects = backgroundObjects;
        this.platform = platform;
        this.stars = stars;
        this.crystal = crystal;
    }
}