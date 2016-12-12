import GridDimensions = require("../gridDimensions");
class Light extends THREE.PointLight{
    constructor(x: number, y: number, floor: number, color: string, intensity: number){
        super(color, .75, .5, .5);
        this.position.x = x * GridDimensions.width;
        this.position.y = -(y * GridDimensions.height);
        this.position.z = .2;
        this.castShadow = true;
    }
}

export = Light;