import PieceBase from './piece-base.js';
export class Knight extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y, 'knight');
        this.populateMoveList();
    }

    populateMoveList(){
        let vc = this.validityConditions;
        this.moveList = [
            [[[2, 1], [vc.FRIEND_ABSENT]]],
            [[[2, -1], [vc.FRIEND_ABSENT]]],
            [[[-2, 1], [vc.FRIEND_ABSENT]]],
            [[[-2, -1], [vc.FRIEND_ABSENT]]],
            [[[1, 2], [vc.FRIEND_ABSENT]]],
            [[[1, -2], [vc.FRIEND_ABSENT]]],
            [[[-1, 2], [vc.FRIEND_ABSENT]]],
            [[[-1, -2], [vc.FRIEND_ABSENT]]],
        ];
    }
}