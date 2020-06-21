import PieceBase from './piece-base.js';
export class Pawn extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y);
        this.name = 'pawn';
    }
}