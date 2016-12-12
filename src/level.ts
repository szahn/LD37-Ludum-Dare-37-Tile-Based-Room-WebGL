import Cell = require("./interfaces/cell");
import CellContainer = require("./interfaces/cellContainer");
import CellType = require("./enums/cellType");
import Coordinate = require("./interfaces/coordinate");
import Pickup = require("./objects/pickup");

class Level {

    public size: number;
    public cells : CellContainer[][];
    public playerSpawn : Coordinate;
    public gem : Pickup;

    constructor(size : number){
        this.size = size;
        this.cells = [];
        for (let c = 0; c < size; c ++){
            this.cells[c] = new Array<CellContainer>(size);
        }
    }

    fill(type : CellType){
        for (let c = 0; c < this.size;c++){
            for (let r = 0; r < this.size;r++){
                this.cells[c][r] = {
                    current: {
                        type: type,
                        object: null
                    }
                }                        
            }            
        }
    }

    private setCell(c: number, r: number, type : CellType, cellId: "current" | "to" = "current"){
        const container : any = this.cells[c][r];
        container[cellId] = {
            type: type,
            object: null
        }        
    }

    border(c: number, r: number, size: number){
        for (let x = r - size; x <= r + size; x++){
            this.setCell(c -size, x, CellType.Wall);
            this.setCell(c +size, x, CellType.Wall);
        }

        for (let y = c - size; y <= c + size; y++){
            this.setCell(y, r - size, CellType.Wall);
            this.setCell(y, r + size, CellType.Wall);
        }
    }

    buildWall(c : number, r : number){
        this.setCell(c, r, CellType.Wall);
    }

     buildBoundaries(l: number){
        for (let c = l; c <= this.size - l -1;c++){
            this.setCell(c, l, CellType.Wall);
            this.setCell(c, this.size - 1 - l, CellType.Wall);
        }
        for (let r = l; r <= this.size - l-1;r++){
            this.setCell(l, r, CellType.Wall);
            this.setCell(this.size - 1 - l, r, CellType.Wall);
        }            
    }

}

export = Level;