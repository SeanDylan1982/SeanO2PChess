import DrawChessboard from '../drawing/index.js';

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
        
        if(piece === 'blank'){
            return;
        }
        
        let direction = piece[0] === 'w' ? -1 : 1;
        
        const piece_val = piece.split('_')[1];
        
        switch (piece_val) {
            case 'pawn':
                this.checkPawnMoves(fromX, fromY, piece[0], direction);
                break;

            case 'rook':
                this.checkRookMoves(fromX, fromY, piece[0], direction);
                break;
        
            case 'bishop':
                this.checkBishopMoves(fromX, fromY, piece[0], direction);
                break;
        
            case 'queen':
                this.checkQueenMoves(fromX, fromY, piece[0], direction);
                break;
            
            case 'knight':
                this.checkKnightMoves(fromX, fromY, piece[0], direction);
                break;
            
            case 'king':
                this.checkKingMoves(fromX, fromY, piece[0], direction);
                break;
        
            default:
                break;
        }
    }

    checkBoundaryCondition(x, y){
        if(x < 0 || y < 0 || x > 7 || y > 7){
            return false;
        }

        return true;
    }

    checkIfEmpty(x, y){
        
        if(this.gameState[x][y] !== 'blank'){
            return false;
        }
        return true;
    }

    checkFriendly(x, y, color){
        if(this.gameState[x][y][0] !== color[0]){
            return false;
        }
        return true;
    }

    checkEnemy(x, y, color){
        
        if(this.gameState[x][y] === 'blank' || this.checkFriendly(x, y, color)){
            return false;
        }
        return true;
    }

    setAsProbableMove(x, y){
        this.probableMoves.push([x,y]);
        this.drawCtx.addHighlight(x, y);
    }

    checkPawnMoves(x, y, color, dir){

        if(this.checkBoundaryCondition(x + dir, y) && this.checkIfEmpty(x + dir, y)){
            this.setAsProbableMove(x + dir, y);
        }
        if(this.checkBoundaryCondition(x + dir, y + dir) && this.checkEnemy(x + dir, y + dir, color)){
            this.setAsProbableMove(x + dir, y + dir);
        }
        if(this.checkBoundaryCondition(x + dir, y - dir) && this.checkEnemy(x + dir, y - dir, color)){
            this.setAsProbableMove(x + dir, y - dir);
        }
    }

    checkRookMoves(x, y, color, dir){
        
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

    checkBishopMoves(x, y, color, dir){
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

    checkQueenMoves(x, y, color, dir){
        this.checkRookMoves(x, y, color, dir);
        this.checkBishopMoves(x, y, color, dir);
    }

    checkKnightMoves(x, y, color, dir){
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

    checkKingMoves(x, y, color, dir){
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

        if(piece === 'blank'){
            return false;
        }

        let direction = piece[0] === 'w' ? 0 : 1;
        if(direction !== this.turn){
            return false;
        }

        return true;
    }

    validateMoveEnd(toX, toY){        
        const isValidMove = this.probableMoves.some(([x, y]) => x === toX && y === toY);
        let hasWon = false;
        
        if(isValidMove){
            if(this.gameState[toX][toY].split('_')[1] === 'king'){
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
        this.gameState[fromX][fromY] = 'blank';
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