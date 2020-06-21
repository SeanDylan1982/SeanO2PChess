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