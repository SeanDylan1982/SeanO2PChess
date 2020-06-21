import PieceBase from './piece-base.js';
export class Pawn extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y, 'pawn');
        this.populateMoveList();
    }

    populateMoveList(){
        let vc = this.validityConditions;

        let dirMoves = [
            [[this.direction, 0], [vc.EMPTY]],
            [[2 * this.direction, 0], [vc.EMPTY, vc.FIRST_MOVE]],
        ];        
        this.moveList.push(dirMoves);
        this.moveList.push([[[this.direction, 1], [vc.ENEMY_PRESENT]]]);
        this.moveList.push([[[this.direction, -1], [vc.ENEMY_PRESENT]]]);
    }
}