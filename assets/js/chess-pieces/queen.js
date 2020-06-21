import PieceBase from './piece-base.js';
export class Queen extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y);
        this.name = 'queen';
    }
}