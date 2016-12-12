import Sprite = require("./objects/sprite");

class CollisionDetection {
    static spriteIntersectsWithMesh(a: Sprite, b: THREE.Object3D, dX: number = 0, dY: number = 0){
        const box = new THREE.Box3().setFromObject(a);
        const w = (box.max.x - box.min.x) - .01;
        const x = ((dX < 0) ? ((box.min.x + dX) - 0) : (dX > 0) ? ((box.min.x + dX) - 0) : ((box.min.x + dX) - 0)) + .005;
        const h = (box.max.y - box.min.y) - .01;
        const y = ((dY < 0) ? ((box.min.y + dY) - 0) : (dY > 0) ? ((box.min.y + dY) - 0) : ((box.min.y + dY) - 0)) + .005;

        return this.boxIntersectsWithXY(
            new THREE.Box3(new THREE.Vector3(x, y, a.position.z), 
            new THREE.Vector3(x + w, y + h, a.position.z)), 
            new THREE.Box3().setFromObject(b), 0, 0);        
    }

    private static boxIntersectsWithXY(a : THREE.Box3, b : THREE.Box3, dX : number = 0, dY : number = 0){
        if (dX < 0){
            
        }
        else if (dY < 0){
            return (a.min.x - (dX || 0) <= b.max.x &&
                a.max.x + (dX || 0) >= b.min.x &&
                a.min.y + (dY || 0) <= b.max.y &&
                a.max.y - (dY || 0) >= b.min.y)
        }

        return (a.min.x - (dX || 0) <= b.max.x &&
            a.max.x + (dX || 0) >= b.min.x &&
            a.min.y - (dY || 0) <= b.max.y &&
            a.max.y + (dY || 0) >= b.min.y);    
    }
}

export = CollisionDetection;