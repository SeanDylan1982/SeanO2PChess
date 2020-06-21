import PieceBase from './piece-base.js';
export class Queen extends PieceBase{
    constructor(isWhite, x, y){
        super(isWhite, x, y, 'queen');
        this.populateMoveList();
    }

    populateMoveList(){
        let vc = this.validityConditions;
        
        let dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[i,0],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[-i,0],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[0,i],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[0,-i],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[i,i],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[i,-i],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[-i,i],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);

        dirMoves = [];
        for(let i = 1; i <= 7; ++i){
            dirMoves.push([[-i,-i],[vc.FRIEND_ABSENT]]);
        }
        this.moveList.push(dirMoves);
    }
}