function isEmpty(x, y, gameState) {
    return !gameState[x][y];
}

function isFirstMove(piece) {
    return piece.isFirstMove;
}

function isEnemyPresent(x, y, piece, gameState) {
    if(!gameState[x][y] || gameState[x][y].isWhite === piece.isWhite){
        return false;
    }
    return true;
}

function IsFriendAbsent(x, y, piece, gameState) {
    return isEmpty(x, y, gameState) || isEnemyPresent(x, y, piece, gameState);
}

export default {
    EMPTY: (x, y, piece, gameState) => {
        return isEmpty(x, y, gameState);
    },
    FIRST_MOVE: (x, y, piece, gameState) => {
        return isFirstMove(piece);
    },
    ENEMY_PRESENT: (x, y, piece, gameState) => {
        return isEnemyPresent(x, y, piece, gameState);
    },
    FRIEND_ABSENT: (x, y, piece, gameState) => {
        return IsFriendAbsent(x, y, piece, gameState);
    },
}