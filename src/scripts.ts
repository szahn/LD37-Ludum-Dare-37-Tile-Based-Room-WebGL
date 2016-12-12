import World = require("./world");
import WallMesh = require("./objects/wallMesh");
import FloorMesh = require("./objects/floorMesh");
import CellType = require("./enums/celLType");

class Scripts{
    static lastTimeout : number;

    static begin(){
        this.lastTimeout = setTimeout(this.stepA, 4000);
    }

    private static stepA(){
        World.assets.play("switch");
        const level = World.level;
        const scene = World.scene;      
        const centerTile = Math.floor(level.size / 2);
        Scripts.transitionToBorder(centerTile, centerTile, 3, CellType.Floor);
        Scripts.transitionToBorder(centerTile, centerTile, 7, CellType.Wall);
        this.lastTimeout = setTimeout(()=>{
            Scripts.transitionToBorder(centerTile, centerTile, 3, CellType.Wall);
            this.lastTimeout = setTimeout(Scripts.stepB, 1000);        
        }, 3000);        
    }

    private static stepB(){
        World.assets.play("switch");
        const level = World.level;
        const scene = World.scene;      
        const centerTile = Math.floor(level.size / 2);
        Scripts.transitionToBorder(centerTile, centerTile, 7, CellType.Floor);
        Scripts.transitionToBorder(centerTile, centerTile, 11, CellType.Wall);
        this.lastTimeout = setTimeout(()=>{
            Scripts.transitionToBorder(centerTile, centerTile, 7, CellType.Wall);
        }, 3000)
        this.lastTimeout = setTimeout(Scripts.stepC, 4000);
    }

    private static stepC(){
        World.assets.play("switch");
        const level = World.level;
        const scene = World.scene;      
        const centerTile = Math.floor(level.size / 2);
        Scripts.transitionToBorder(centerTile, centerTile, 11, CellType.Floor);
        Scripts.transitionToBorder(15, 29, 1, CellType.Wall);
        this.lastTimeout = setTimeout(Scripts.stepD, 6000);
    }

    private static stepD(){
        World.assets.play("switch");
        const level = World.level;
        const scene = World.scene;      
        const centerTile = Math.floor(level.size / 2);
        Scripts.transitionToBorder(centerTile, centerTile, 11, CellType.Wall);
        this.lastTimeout = setTimeout(Scripts.stepE, 6000);
    }

    private static stepE(){
        World.assets.play("switch");
        const level = World.level;
        const scene = World.scene;      
        const centerTile = Math.floor(level.size / 2);
        Scripts.transitionToBorder(centerTile, centerTile, 11, CellType.Floor);
        Scripts.transitionToBorder(centerTile, centerTile, 7, CellType.Floor);
        Scripts.transitionToBorder(centerTile, centerTile, 3, CellType.Floor);
        Scripts.transitionToBorder(15, 29, 1, CellType.Floor);
        this.lastTimeout = setTimeout(Scripts.stepA, 8000);
    }

    private static transitionToBorder(c: number, r: number, size: number, type: CellType){
        const {level, scene} = World;
        
        for (let x = c - size; x <= c + size; x++){
            level.cells[x][r - size].to = {
                type: type,
                object: (type === CellType.Wall) ? new WallMesh(x, r - size, -1, "#fff") : new FloorMesh(x, r - size, -1, "#fff",World.assets.getRandomFloorTexture()) 
            }
            scene.add(level.cells[x][r - size].to.object);        

            level.cells[x][r + size].to = {
                type: type,
                object: (type === CellType.Wall) ? new WallMesh(x, r + size, -1, "#fff") : new FloorMesh(x, r + size, -1, "#fff",World.assets.getRandomFloorTexture())
            }
            scene.add(level.cells[x][r + size].to.object);        
        }

        for (let y = r - size; y <= r + size; y++){
            level.cells[c - size][y].to = {
                type: type,
                object: (type === CellType.Wall) ? new WallMesh(c - size, y, -1, "#fff") : new FloorMesh(c - size, y, -1, "#fff",World.assets.getRandomFloorTexture())
            }
            scene.add(level.cells[c - size][y].to.object);        

            level.cells[c + size][y].to = {
                type: type,
                object: (type === CellType.Wall) ? new WallMesh(c + size, y, -1, "#fff") : new FloorMesh(c + size, y, -1, "#fff",World.assets.getRandomFloorTexture())
            }
            scene.add(level.cells[c + size][y].to.object);        
        }
    }

}

export =  Scripts;