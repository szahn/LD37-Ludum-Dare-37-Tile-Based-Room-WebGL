import Viewport = require("./viewport");

class GameCamera extends THREE.PerspectiveCamera{
    constructor(){
        super(75, Viewport.width() / Viewport.height(), 0.1, 1000);
        this.position.z = 2;
        this.position.x = 1;
        this.position.y = -2;
        this.rotation.x = 0;
    }
}

export = GameCamera;