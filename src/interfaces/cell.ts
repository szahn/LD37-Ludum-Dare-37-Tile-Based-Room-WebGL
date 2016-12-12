import CellType = require("../enums/cellType");
import Meshable = require("../objects/meshable");
interface Cell{
    type : CellType; 
    object: Meshable;   
}

export = Cell;