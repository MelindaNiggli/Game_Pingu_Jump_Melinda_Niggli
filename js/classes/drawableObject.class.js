class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 100;

    
    draw(ctx) {
        try {
            // Bild zeichnen
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            
        } catch (error) {
            console.warn('Fehler beim Laden des Bildes', error);
            console.warn('Das Bild konnte nicht geladen werden:', this.img.src);
        }
    }
    

loadImage(path){
    this.img = new Image(); 
    this.img.src = path;
}
loadImages(arr){
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
}

drawFrame(ctx){
 
    //      ctx.beginPath();
    //    ctx.lineWidth = '5';
    //      ctx.strokeStyle = 'blue';
    //      ctx.rect( this.x, this.y, this.width, this.height);
    //      ctx.stroke();
    
   }


}