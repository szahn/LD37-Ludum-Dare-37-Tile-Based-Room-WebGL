import WallMesh = require("./objects/wallMesh");
import FloorMesh = require("./objects/floorMesh");
import GameScene = require("./gameScene");
import Light = require("./objects/light");
import Level = require("./level");
import CellType = require("./enums/celLType");
import Sprite = require("./objects/sprite");
import Character = require("./objects/character");
import World = require("./world");
import Pickup = require("./objects/pickup");
class SceneBuilder {   

    static build(level: Level, scene : GameScene){
        scene.ambientLight("#000");
        const wallTexture = World.assets.get("wall");
        for (let c = 0; c < level.size;c++){
            for (let r = 0; r < level.size;r++){
                const cell = level.cells[c][r].current;
                switch (cell.type){
                    case CellType.Floor:{
                        cell.object = new FloorMesh(c, r, 0, "#fff", World.assets.getRandomFloorTexture());
                        scene.add(cell.object);
                        break;
                    }
                    case CellType.Wall:{
                        cell.object = new WallMesh(c, r, 0, "#fff"); 
                        scene.add(cell.object);
                        break;
                    }
                }                
            }            
        }

        level.gem = new Pickup(15,29, World.assets.get("gem"));
        scene.add(level.gem.sprite);

        World.player = new Character(level.playerSpawn.x, level.playerSpawn.y, {
            moveSpeed: .25
        },World.assets.get("baldric"));

        scene.add(World.player.sprite);        
        scene.add(World.player.light);       

    }

}

export = SceneBuilder; 