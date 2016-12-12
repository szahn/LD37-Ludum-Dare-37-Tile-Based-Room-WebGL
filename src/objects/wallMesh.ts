import GridDimensions = require("../gridDimensions");
import Meshable = require("./meshable");
import World = require("../world");

class WallMesh extends Meshable {

    constructor(x: number, y: number, floor : number, color: string){
        const wallCeilingTexture = World.assets.get("ceiling");
        var materials = [
            new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading, shininess: 0, map: World.assets.getRandomWallTexture()}),
            new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading, shininess: 0, map: World.assets.getRandomWallTexture()}),
            new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading, shininess: 0, map: World.assets.getRandomWallTexture()}),
            new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading, shininess: 0, map: World.assets.getRandomWallTexture()}),
            new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading, shininess: 0, map: wallCeilingTexture}),
            new THREE.MeshPhongMaterial( {color: color, shading: THREE.SmoothShading, shininess: 0, map: null})
        ];

        super(new THREE.BoxGeometry(GridDimensions.width, GridDimensions.height, GridDimensions.depth), 
            new THREE.MeshFaceMaterial(materials));

        this.name = `wall${x}x${y}x${floor}`;
        this.position.set(x * GridDimensions.width, -(y * GridDimensions.height), floor * GridDimensions.depth);
        this.initialPosition = this.position.clone();
        this.initialPosition.set(this.initialPosition.x, this.initialPosition.y, 0 * GridDimensions.depth);
    }

}

export = WallMesh;