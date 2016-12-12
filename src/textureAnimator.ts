function TextureAnimator(texture : THREE.Texture, tilesHoriz : number, tilesVert : number, numTiles : number, tileDispDuration : number = 1) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );
	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;
	this.tickFrame = 0;
	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function(row : number, ticks  : number)
	{
		this.tickFrame += ticks;
        if (this.tickFrame > tileDispDuration){
            this.tickFrame = 0;
            this.currentTile++;
        }
        if (this.currentTile == this.numberOfTiles)
            this.currentTile = 0;
        var currentColumn = this.currentTile % this.tilesHorizontal;
        texture.offset.x = currentColumn / this.tilesHorizontal;
        var currentRow = row / this.tilesVertical;
        texture.offset.y = currentRow;
	};
}		

export = TextureAnimator;