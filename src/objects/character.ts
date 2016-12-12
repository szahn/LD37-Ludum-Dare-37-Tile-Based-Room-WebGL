import Sprite = require("./sprite");
import Stats = require("../interfaces/stats");
import Light = require("./light");
import TextureAnimator = require("../textureAnimator");
class Character {
    public sprite: Sprite;
    public light : Light;
    public stats: Stats;
    public animator : any;

    constructor(x: number, y: number, stats: Stats, texture : THREE.Texture){
        this.sprite = new Sprite(x, y, 0, texture);
        this.stats = stats;
        this.light = new Light(x, y, 0, "#fff", 3);
        this.animator = new TextureAnimator(texture, 9, 4, 9);
    }

    tick(ticks: number, shouldAnimate: boolean, facing : number){
        if (shouldAnimate){
            this.animator.update(facing, 10 * ticks);
        }
    }

    move(x : number, y: number){
        this.sprite.position.set(this.sprite.position.x + x, this.sprite.position.y + y, this.sprite.position.z);
        this.light.position.set(this.light.position.x + x, this.light.position.y + y, this.light.position.z);
    }


}

export = Character;