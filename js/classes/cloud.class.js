class Cloud extends MovableObject{
    constructor(){
        super().loadImage('img/backgrounds/02/layers/l3_clouds.png');
        this.y = 25;
        this.x = 700 + Math.random() * 8000; 
        this.width = 1000;
        this.height = 600;
        this.animate();
    }
    
    animate(){
        setInterval( () => {
            this.moveLeft();
        }, 900 / 105);
    }
}