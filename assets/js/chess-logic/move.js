import GameLogic from './logic.js';
import DrawChessboard from '../drawing/index.js';

export default class Move{
    constructor(gameState, chessBoardElem, turnParent, timerParent, lostWParent, lostBParent){
        this.gameLogic = new GameLogic(gameState);
        this.drawCtx = new DrawChessboard();

        this.chessBoardElem = chessBoardElem;
        this.turnParent = turnParent;
        this.timerParent = timerParent;
        this.lostBParent = lostBParent;
        this.lostWParent = lostWParent;
        
        this.started = false;
        this.fromX = null;
        this.fromY = null;
        this.toX = null;
        this.toY = null;

        this.gameLogic.updateTimer(this.timerParent);
    }

    moveFrom(fromX, fromY){
        
        if(!this.gameLogic.validateMoveStart(fromX, fromY)){
            return;
        }

        this.gameLogic.actionsOnMoveStart(fromX, fromY);

        if(this.gameLogic.validMovesExist()){
            this.started = true;
            this.fromX = fromX;
            this.fromY = fromY;
            this.toX = null;
            this.toY = null;
        }
    }
    
    moveTo(toX, toY){
        const isValidMove = this.gameLogic.validateMoveEnd(toX, toY);

        if(isValidMove){
            this.toX = toX;
            this.toY = toY;
            this.gameLogic.checkForLostPieces(toX, toY, this.lostWParent, this.lostBParent);
            const hasWon = this.gameLogic.checkForWinner(toX, toY);
            this.gameLogic.updateGameState(this.fromX, this.fromY, this.toX, this.toY);
            this.drawCtx.drawMove(this.gameLogic.getGameState(), this.fromX, this.fromY, this.toX, this.toY, this.chessBoardElem);

            if(hasWon){
                this.drawCtx.showWinningScreen(this.gameLogic.winnerId, this.chessBoardElem.parentElement);
            }else{
                this.drawCtx.changeTurn(this.gameLogic.turn, this.turnParent);
                this.gameLogic.updateTimer(this.timerParent);
            }            
        }

        this.started = false;
        this.gameLogic.actionsOnMoveEnd();
    }
}