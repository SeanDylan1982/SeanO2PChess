import { Pawn } from './pawn.js';
import { Rook } from './rook.js';
import { Bishop } from './bishop.js';
import { Knight } from './knight.js';
import { Queen } from './queen.js';
import { King } from './king.js';

export default {
    pawn: (color, x, y) => new Pawn(color === 'w', x, y),
    rook: (color, x, y) => new Rook(color === 'w', x, y),
    bishop: (color, x, y) => new Bishop(color === 'w', x, y),
    knight: (color, x, y) => new Knight(color === 'w', x, y),
    queen: (color, x, y) => new Queen(color === 'w', x, y),
    king: (color, x, y) => new King(color === 'w', x, y),
}