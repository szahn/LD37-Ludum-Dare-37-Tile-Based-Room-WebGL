import Sprite = require("./sprite");
class Pickup {
    public sprite: Sprite;

    constructor(x: number, y: number, texture : THREE.Texture){
        this.sprite = new Sprite(x, y, 0, texture);
        this.sprite.position.set(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z -.01);
        this.sprite.scale.set(.75, .75, .75);
    }
}

export = Pickup;