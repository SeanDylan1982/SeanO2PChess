import PieceBase from './piece-base.js';
export class King extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y, 'king');
        this.populateMoveList();
    }

    populateMoveList(){
        let vc = this.validityConditions;
        this.moveList = [
            [[[1, 0], [vc.FRIEND_ABSENT]]],
            [[[1, 1], [vc.FRIEND_ABSENT]]],
            [[[0, 1], [vc.FRIEND_ABSENT]]],
            [[[-1, 1], [vc.FRIEND_ABSENT]]],
            [[[-1, 0], [vc.FRIEND_ABSENT]]],
            [[[-1, -1], [vc.FRIEND_ABSENT]]],
            [[[0, -1], [vc.FRIEND_ABSENT]]],
            [[[1, -1], [vc.FRIEND_ABSENT]]],
        ];
    }
}