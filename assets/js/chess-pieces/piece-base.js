import {VALIDITY_CONDITIONS} from '../constants/movesValidity.js';
import ChessPieces from '../drawing/chess-pieces.js';

export default class PieceBase{
    constructor(isWhite, x, y, pieceName){
        this.isWhite = isWhite;
        this.direction = isWhite ? -1 : 1;
        this.name = pieceName; 
        this.x = x;
        this.y = y;
        this.isFirstMove = true;
        this.alive = true;
        this.validityConditions = VALIDITY_CONDITIONS;
        this.moveList = [];
        this.template = ChessPieces[pieceName](isWhite ? 'white' : 'black');
    }
}

// moveList is of the form Array of moveGroup, 
// Each moveGroup is an array of moves, in which each move is dependent on previous move bein valid
// moveGroup is of the form [[x, y], [Conditions]]
// x, y are the x, y cordinates for which validity is bein checked
// Conditions are all the necessary conditions for validity, All of conditions must be true in order for the cell to be valid