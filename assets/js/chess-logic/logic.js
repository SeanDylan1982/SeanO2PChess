import DrawChessboard from '../drawing/index.js';
import validityChecks from './validityChecks.js';

export default class GameLogic{
    constructor(gameState){
        this.gameState = gameState;
        this.drawCtx = new DrawChessboard();
        this.probableMoves = [];
        this.turn = 0; // white -> 0, black -> 1
        this.timer = [0, 0];
        this.intervalRef = null;
    }

    getValidMoves(fromX, fromY){  
        
        let piece = this.gameState[fromX][fromY];
        
        if(!piece){
            return;
        }

        this.getMoveSuggestions(fromX, fromY, piece);
    }

    checkBoundaryCondition(x, y){
        if(x < 0 || y < 0 || x > 7 || y > 7){
            return false;
        }

        return true;
    }

    checkIfEmpty(x, y){
        
        if(!this.gameState[x][y]){
            return false;
        }
        return true;
    }

    checkFriendly(x, y, isWhite){
        if(this.gameState[x][y].isWhite !== isWhite){
            return false;
        }
        return true;
    }

    checkEnemy(x, y, isWhite){
        
        if(!this.gameState[x][y] || this.checkFriendly(x, y, isWhite)){
            return false;
        }
        return true;
    }

    setAsProbableMove(x, y){
        this.probableMoves.push([x,y]);
        this.drawCtx.addHighlight(x, y);
    }

    getMoveSuggestions(x, y, piece){

        piece.moveList.forEach(moveGroup => {
            moveGroup.every(([[dx, dy], conditions]) => {
                
                if(!this.checkBoundaryCondition(x + dx, y + dy)){
                    return false;
                }
    
                if(conditions.every(con => validityChecks[con](x + dx, y + dy, piece, this.gameState))){
                    this.setAsProbableMove(x + dx, y + dy);
                    return true;

                }else{
                    return false;
                }
            });
        });
    }

    checkRookMoves(x, y, piece){
        
        for (let dy = 1; dy <= 7; dy++) {
            if(!this.checkBoundaryCondition(x, y + dy)){
                break;
            }

            if(this.checkIfEmpty(x, y + dy)){
                this.setAsProbableMove(x, y + dy);
            }else if(this.checkEnemy(x, y + dy, color)){
                this.setAsProbableMove(x, y + dy);
                break;
            }else{
                break;
            }
        }

        for (let dy = 1; dy <= 7; dy++) {

            if(!this.checkBoundaryCondition(x, y - dy)){
                break;
            }

            if(this.checkIfEmpty(x, y - dy)){
                this.setAsProbableMove(x, y - dy);
            }else if(this.checkEnemy(x, y - dy, color)){
                this.setAsProbableMove(x, y - dy);
                break;
            }else{
                break;
            }
        }
        for (let dx = 1; dx <= 7; dx++) {
            
            if(!this.checkBoundaryCondition(x + dx, y)){
                break;
            }
            if(this.checkIfEmpty(x + dx, y)){
                this.setAsProbableMove(x + dx, y);
            }else if(this.checkEnemy(x + dx, y, color)){
                this.setAsProbableMove(x + dx, y);
                break;
            }else{
                break;
            }
        }
        for (let dx = 1; dx <= 7; dx++) {
            
            if(!this.checkBoundaryCondition(x - dx, y)){
                break;
            }
            if(this.checkIfEmpty(x - dx, y)){
                this.setAsProbableMove(x - dx, y);
            }else if(this.checkEnemy(x - dx, y, color)){
                this.setAsProbableMove(x - dx, y);
                break;
            }else{
                break;
            }
        }
    }

    checkBishopMoves(x, y, piece){
        for (let diff = 1; diff <= 7; diff++) {
            if(!this.checkBoundaryCondition(x + diff, y + diff)){
                break;
            }

            if(this.checkIfEmpty(x + diff, y + diff)){
                this.setAsProbableMove(x + diff, y + diff);
            }else if(this.checkEnemy(x + diff, y + diff, color)){
                this.setAsProbableMove(x + diff, y + diff);
                break;
            }else{
                break;
            }
        }

        for (let diff = 1; diff <= 7; diff++) {

            if(!this.checkBoundaryCondition(x - diff, y - diff)){
                break;
            }

            if(this.checkIfEmpty(x - diff, y - diff)){
                this.setAsProbableMove(x - diff, y - diff);
            }else if(this.checkEnemy(x - diff, y - diff, color)){
                this.setAsProbableMove(x - diff, y - diff);
                break;
            }else{
                break;
            }
        }
        for (let diff = 1; diff <= 7; diff++) {
            
            if(!this.checkBoundaryCondition(x + diff, y - diff)){
                break;
            }
            if(this.checkIfEmpty(x + diff, y - diff)){
                this.setAsProbableMove(x + diff, y - diff);
            }else if(this.checkEnemy(x + diff, y - diff, color)){
                this.setAsProbableMove(x + diff, y);
                break;
            }else{
                break;
            }
        }
        for (let diff = 1; diff <= 7; diff++) {
            
            if(!this.checkBoundaryCondition(x - diff, y + diff)){
                break;
            }
            if(this.checkIfEmpty(x - diff, y + diff)){
                this.setAsProbableMove(x - diff, y + diff);
            }else if(this.checkEnemy(x - diff, y + diff, color)){
                this.setAsProbableMove(x - diff, y + diff);
                break;
            }else{
                break;
            }
        }
    }

    checkQueenMoves(x, y, piece){
        this.checkRookMoves(x, y, piece.color, piece.direction);
        this.checkBishopMoves(x, y, piece.color, piece.direction);
    }

    checkKnightMoves(x, y, piece){
        let movesArr = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];

        movesArr.forEach(([dx, dy]) => {
            if(this.checkBoundaryCondition(x + dx, y + dy) 
            && (this.checkIfEmpty(x + dx, y + dy) || this.checkEnemy(x + dx, y + dy, color))){
                this.setAsProbableMove(x + dx, y + dy);
            }
        })
    }

    checkKingMoves(x, y, piece){
        const movesArr = [
            [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]
        ];

        movesArr.forEach(([dx, dy]) => {
            if(this.checkBoundaryCondition(x + dx, y + dy) 
            && (this.checkIfEmpty(x + dx, y + dy) || this.checkEnemy(x + dx, y + dy, color))){
                this.setAsProbableMove(x + dx, y + dy);
            }
        })
    }

    actionsOnMoveStart(fromX, fromY){
        this.probableMoves = [];
        this.getValidMoves(fromX, fromY);
    }

    actionsOnMoveEnd(){
        this.probableMoves.forEach(([x, y]) => {
            this.drawCtx.removeHighlight(x, y);
        })
        this.probableMoves = [];
    }

    validateMoveStart(fromX, fromY){

        let piece = this.gameState[fromX][fromY];

        if(!piece){
            return false;
        }

        let selectedPieceDir = piece.isWhite ? 0 : 1;
        if(selectedPieceDir !== this.turn){
            return false;
        }

        return true;
    }

    validateMoveEnd(toX, toY){        
        const isValidMove = this.probableMoves.some(([x, y]) => x === toX && y === toY);
        let hasWon = false;
        
        if(isValidMove){
            const toCell = this.gameState[toX][toY]
            if(!!toCell && toCell.name === 'king'){
                this.stopTimer();
                hasWon = true;
            }else{
                this.turn = (this.turn + 1) % 2;
            }
        }

        return {
            isValidMove,
            hasWon
        };
    }

    updateGameState(fromX, fromY, toX, toY){
        const tmp = this.gameState[fromX][fromY];
        tmp.isFirstMove = false;
        this.gameState[fromX][fromY] = null;
        this.gameState[toX][toY] = tmp;
    }

    getGameState(){
        return this.gameState.map(row => [...row]);
    }

    validMovesExist(){
        return this.probableMoves.length ? true : false;
    }

    stopTimer(){
        clearInterval(this.intervalRef);
    }

    updateTimer(timerParent){
        this.stopTimer();
        this.intervalRef = setInterval(() => {
            ++this.timer[this.turn];
            const hr = Math.floor(this.timer[this.turn] / 3600);
            const min = Math.floor(this.timer[this.turn] / 60);
            const sec = this.timer[this.turn] % 60;
            this.drawCtx.updateTimer(hr, min, sec, timerParent);
        }, 1000);
    }
}