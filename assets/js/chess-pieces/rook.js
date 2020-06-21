import PieceBase from './piece-base.js';
export class Rook extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y);
        this.name = 'rook';
    }
}