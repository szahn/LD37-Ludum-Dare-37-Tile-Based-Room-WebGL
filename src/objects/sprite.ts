import GridDimensions = require("../gridDimensions");

class Sprite extends THREE.Mesh{
    public resetPosition : THREE.Vector3;
    constructor(x: number, y: number, floor: number, texture : THREE.Texture){
        const mat = new THREE.MeshLambertMaterial( { map: texture, color: 0xffffff, side:THREE.DoubleSide });
        mat.transparent = true;
        super(new THREE.PlaneGeometry(GridDimensions.width, GridDimensions.height, 1, 1), mat);        
        this.name = `sprite${x}x${y}x${floor}`;
        this.position.set(x * GridDimensions.width, -(y * GridDimensions.height), floor * GridDimensions.depth);
        this.resetPosition = this.position.clone();
    }
}

export = Sprite;