import chessPieceEntities from './chess-piece-template.js';

export default {
    blank: () => {
        const blank = document.createElement('div')
        blank.classList.add('blank');
        return blank;
    },
    pawn: (color) => {
        const pawn = document.createElement('div')
        pawn.innerHTML = chessPieceEntities[color]['pawn'];
        pawn.classList.add('piece', 'pawn', color);
        pawn.id = color[0] + '_pawn';
        return pawn;
    },
    rook: (color) => {
        const rook = document.createElement('div')
        rook.innerHTML = chessPieceEntities[color]['rook'];
        rook.classList.add('piece', 'rook', color);
        rook.id = color[0] + '_rook';
        return rook;
    },
    knight: (color) => {
        const knight = document.createElement('div')
        knight.innerHTML = chessPieceEntities[color]['knight'];
        knight.classList.add('piece', 'knight', color);
        knight.id = color[0] + '_knight';
        return knight;
    },
    bishop: (color) => {
        const bishop = document.createElement('div')
        bishop.innerHTML = chessPieceEntities[color]['bishop'];
        bishop.classList.add('piece', 'bishop', color);
        bishop.id = color[0] + '_bishop';
        return bishop;
    },
    king: (color) => {
        const king = document.createElement('div')
        king.innerHTML = chessPieceEntities[color]['king'];
        king.classList.add('piece', 'king', color);
        king.id = color[0] + '_king';
        return king;
    },
    queen: (color) => {
        const queen = document.createElement('div')
        queen.innerHTML = chessPieceEntities[color]['queen'];
        queen.classList.add('piece', 'queen', color);
        queen.id = color[0] + '_queen';
        return queen;
    },
}