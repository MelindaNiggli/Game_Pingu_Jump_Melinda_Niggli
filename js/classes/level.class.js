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
    
    constructor(clouds,enemies,endboss,chest,backgroundObjects,platform,stars,crystal ){
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.chest = chest; 
        this.backgroundObjects = backgroundObjects;
        this.platform = platform;
        this.stars = stars;
        this.crystal = crystal;   
    };
}