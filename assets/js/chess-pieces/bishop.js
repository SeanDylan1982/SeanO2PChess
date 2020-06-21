import PieceBase from './piece-base.js';
export class Bishop extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y);
        this.name = 'bishop';
    }
}