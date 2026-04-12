class BackgroundObject extends MovableObject{
    width = 1200;
    height = 690;
    constructor(imagePath, x, y, width, height){
        super().loadImage(imagePath);
        this.x = x; 
        this.y = 690 - this.height;
    }
}