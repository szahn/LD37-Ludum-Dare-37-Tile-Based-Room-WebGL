import SceneBuilder = require("./sceneBuilder");
import World = require("./world");
import Level = require("./level");
import CellType = require("./enums/cellType");
import GameInput = require("./gameInput");
import CollisionDetection = require("./collisionDetection");
import Scripts = require("./scripts");
class Game {
    private clock = new THREE.Clock(true);            
    isRunning = true;

    init(){
        return World.assets.loadAll().then(()=>{
            World.renderer.resize();
            this.buildLevel();
            document.body.appendChild(World.renderer.domElement);
        });
    }

    winGame(){
        World.assets.play("pickup");
        this.isRunning = false;
        if (Scripts.lastTimeout){
            clearTimeout(Scripts.lastTimeout);
        }
        alert("You have won this cheap-ass 3D game, congratulations!");
    }

    buildLevel(){
        const levelSize = 32;
        const center = Math.floor(levelSize / 2);
        const level = new Level(levelSize);
        level.fill(CellType.Floor);        
        level.buildBoundaries(0);
        level.buildWall(center-6,center-6);
        level.buildWall(center+6,center-6);
        level.buildWall(center+6,center+6);
        level.buildWall(center-6,center+6);
        level.buildWall(center-2,center-3);
        level.buildWall(center+2,center-3);
        level.buildWall(center-2,center-2);
        level.buildWall(center+2,center-2);
        level.buildWall(center-4,center);
        level.buildWall(center+4,center);
        level.buildWall(center,center-4);
        level.buildWall(center,center+4);
        level.buildWall(center,center+1);
        level.buildWall(center - 10,center);
        level.buildWall(center - 10,center - 10);
        level.buildWall(center + 10,center);
        level.buildWall(center + 10,center - 10);
        level.buildWall(center ,center- 10);
        level.buildWall(center ,center+ 10);

        level.buildWall(center - 12, center);
        level.buildWall(center - 13, center);
        level.buildWall(center - 14, center);

        level.buildWall(6, 28);
        level.buildWall(6, 26);

        level.buildWall(1, 1);
        level.buildWall(1, 10);
        level.buildWall(1, 20);
        level.buildWall(1, 30);
        level.buildWall(1, 1);
        level.buildWall(30, 1);
        level.buildWall(15, 1);
        level.buildWall(13, 1);
        level.buildWall(17, 1);
        level.buildWall(19, 1);
        level.buildWall(11, 1);
        level.buildWall(30, 10);
        level.buildWall(30, 20);
        level.buildWall(30, 30);
        level.playerSpawn = {
            x: center, 
            y: center - 1
        };

        level.border(center, center, 3);

        SceneBuilder.build(level, World.scene);
        World.level = level;
        setTimeout(()=>{
            Scripts.begin();
        }, 1500);
    }

    tick(ticks : number){
        if (!this.isRunning){
            return;
        }

        World.player.tick(ticks, GameInput.isWalking(), GameInput.state.isUp ? 3 : GameInput.state.isLeft ? 2 : GameInput.state.isDown ? 1 : 0);

        let x : number = 0, y: number = 0;
        if (GameInput.state.isDown){
            y =- World.player.stats.moveSpeed * ticks;
        }
        else if (GameInput.state.isUp){
            y = World.player.stats.moveSpeed * ticks;
        }

        if (GameInput.state.isLeft){
            x =- World.player.stats.moveSpeed * ticks;
        }
        else if (GameInput.state.isRight){
            x = World.player.stats.moveSpeed * ticks;
        }

        for (let c = 0; c < World.level.size;c++){
            for (let r = 0; r < World.level.size;r++){
                const cell = World.level.cells[c][r];

                if (cell.current.type == CellType.Wall){
                    if (y !== 0 && CollisionDetection.spriteIntersectsWithMesh(World.player.sprite, cell.current.object, 0, y)){
                        y = 0;
                    }
                    if (x !== 0 && CollisionDetection.spriteIntersectsWithMesh(World.player.sprite, cell.current.object, x, 0)){
                        x = 0;
                    }
                }
                if (cell.to && cell.to.type == CellType.Wall){
                    if (y !== 0 && CollisionDetection.spriteIntersectsWithMesh(World.player.sprite, cell.to.object, 0, y)){
                        y = 0;
                    }
                    if (x !== 0 && CollisionDetection.spriteIntersectsWithMesh(World.player.sprite, cell.to.object, x, 0)){
                        x = 0;
                    }
                }
            }            
        }

        if (CollisionDetection.spriteIntersectsWithMesh(World.player.sprite, World.level.gem.sprite, 0, 0)){
            this.winGame();
        }

        if (x || y) {
            World.player.move(x, y);
        }

        World.camera.position.x = World.player.sprite.position.x;
        World.camera.position.y = World.player.sprite.position.y;

        for (let c = 0; c < World.level.size;c++){
            for (let r = 0; r < World.level.size;r++){
                const cell = World.level.cells[c][r];
                const hasTo = !!cell.to;                                
                if (hasTo && cell.to.object.position.z < 0){
                    cell.current.object.position.z -= .20 * ticks;
                    cell.to.object.position.z += .20 * ticks;
                    if (cell.to.object.position.z > cell.to.object.initialPosition.z){
                        cell.to.object.position.z = cell.to.object.initialPosition.z;
                        World.scene.remove(cell.current.object);
                        cell.current = cell.to;
                        cell.to = undefined;
                    }
                }

                                
            }            
        }

    }

    render = () => {
        if (!this.isRunning){
            return;
        }

        requestAnimationFrame(this.render);
        this.tick(this.clock.getDelta());
        World.renderer.clearDepth();
        World.renderer.render(World.scene, World.camera);
    }
}

export = new Game();