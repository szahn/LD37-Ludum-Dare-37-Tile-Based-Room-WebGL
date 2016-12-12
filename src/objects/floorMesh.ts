import GridDimensions = require("../gridDimensions");
import Meshable = require("./meshable");
class FloorMesh extends Meshable {
    constructor(x: number, y: number, floor : number, color: string, texture: THREE.Texture){
        super(new THREE.PlaneGeometry(GridDimensions.width, GridDimensions.height), 
            new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading, shininess: 0, map: texture}));      

        this.name = `floor${x}x${y}x${floor}`;
        this.position.set(x * GridDimensions.width, -(y * GridDimensions.height), ((floor * GridDimensions.depth) - (GridDimensions.depth / 2)));
        this.initialPosition = this.position.clone();
        this.initialPosition.set(this.initialPosition.x, this.initialPosition.y, ((0 * GridDimensions.depth) - (GridDimensions.depth / 2)))
    }

}

export = FloorMesh;