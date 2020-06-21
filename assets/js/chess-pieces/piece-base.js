import chessPieces from "./chess-pieces";

import ChessPieces from './chess-pieces';

export class PieceBase{
    constructor(isWhite, x, y, pieceName){
        this.isWhite = isWhite;
        this.direction = isWhite ? -1 : 1;
        this.x = x;
        this.y = y;
        this.alive = true;
        this.name = '';
        this.template = ChessPieces[pieceName](isWhite ? 'white' : 'black');
    }
}