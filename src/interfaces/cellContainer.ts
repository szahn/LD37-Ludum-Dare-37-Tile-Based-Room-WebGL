import Cell = require("./cell");
interface CellContainer{
    current: Cell;
    to ?: Cell;
    from ?: Cell;
}

export = CellContainer;