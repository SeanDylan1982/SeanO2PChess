// Game state
// 8 X 8 array of string

// w_lKnight, b_rRook

import Pieces from './chess-pieces.js';

const validPieces = new Set([
    'blank', 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'
])

export default class DrawChessboard{
    constructor(){}

    drawBoard(gameState, parentNode){
        if (gameState.length !== 8) {
            throw "Invalid Game State";
        }

        if(gameState[0].length !== 8) {
            throw "Invalid Game State";
        }
        
        let fragment = document.createDocumentFragment();
        
        gameState.forEach((row, rowNum) => {
            row.forEach((piece, colNum) => {
                const cell = this.createCell(piece, rowNum, colNum);
                fragment.appendChild(cell);
            })
        });

        if(!parentNode){
            throw 'Parent Node not found. Cannot draw.'
        }

        this.clearChildren(parentNode);
        
        parentNode.appendChild(fragment);
    }

    clearChildren(node){
        if(!node){
            throw 'Parent Node not found. Cannot clear child.'
        }

        while (node.firstChild) {
            node.removeChild(node.lastChild);
        }
    }

    addHighlight(...args){
        
        if(args.length === 2 && typeof args[0] === "number" && typeof args[1] === "number"){
           
            const cid = `${args[0]}_${args[1]}_cid`;
            document.getElementById(cid).classList.add('highlighted');
        }else if(args.length === 1 && args[0] instanceof Element){
            
            node.classList.add('highlighted');
        }else{
            throw 'Invalid args for highlight.'
        }
    }

    removeHighlight(...args){
        if(args.length === 2 && typeof args[0] === "number" && typeof args[1] === "number"){
            
            const cid = `${args[0]}_${args[1]}_cid`;
            document.getElementById(cid).classList.remove('highlighted');
        }else if(args.length === 1 && args[0] instanceof Element){
            
            node.classList.remove('highlighted');
        }else{
            throw 'Invalid args for highlight.'
        }
    }

    createCell(piece, rowNum, colNum){
        
        if(!!piece){
            if(!validPieces.has(piece.name)){
                throw "Invalid Piece";
            }
        }

        const cell = document.createElement('div');
        !!piece && cell.appendChild(piece.template);
        
        if((rowNum + colNum) % 2){
            cell.classList.add('board-cell', 'b');
        }else{
            cell.classList.add('board-cell', 'w');
        }

        cell.id = `${rowNum}_${colNum}_cid`

        return cell;
    }

    drawMove(gameState, fromX, fromY, toX, toY, parentNode){

        if(fromX === toX && fromY === toY){
            return;
        }

        const fromPosId = `${fromX}_${fromY}_cid`;
        const toPosId = `${toX}_${toY}_cid`;

        let fromPosVal = gameState[fromX][fromY];
        let toPosVal = gameState[toX][toY];

        const newFromCell = this.createCell(fromPosVal, fromX, fromY);
        const newToCell = this.createCell(toPosVal, toX, toY);

        const oldFromCell = document.getElementById(fromPosId);
        const oldToCell = document.getElementById(toPosId);

        parentNode.replaceChild(newFromCell, oldFromCell);
        parentNode.replaceChild(newToCell, oldToCell);
    }

    changeTurn(currTurn, parentNode){
        const playerColor = currTurn === 0 ? 'White' : 'Black';
        parentNode.innerText = `${playerColor}'s Turn`
    }

    updateTimer(hr, min, sec, parentElem){
        hr = ('0' + hr).substr(-2);
        min = ('0' + min).substr(-2);
        sec = ('0' + sec).substr(-2);
        parentElem.innerText = `${hr} : ${min} : ${sec}`;
    }

    showWinningScreen(winnerId, parent){
        let winDiv = document.createElement('div');
        winDiv.id = 'win-screen';
        const winnerName = winnerId === 0 ? 'White' : 'Black';
        winDiv.innerText = `${winnerName} Wins!`;
        parent.appendChild(winDiv);
    }
}