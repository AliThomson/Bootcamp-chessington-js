import Square from "../square";
// Split this into add vertical and add horizontal
exports.addHorizontalMoves = function (location) {
    let availableMoves = [];
    let endPoint = 7;
    let colCurrentPlayer = location.col;
    let rowCurrentPlayer = location.row;

    for (let i=0; i<=endPoint; i++) {

        if (i !== colCurrentPlayer) {
            availableMoves.push(Square.at(rowCurrentPlayer, i));
        }
    }
    return availableMoves;
}

exports.addVerticalMoves = function (location) {
    let availableMoves = [];
    let endPoint = 7;
    let colCurrentPlayer = location.col;
    let rowCurrentPlayer = location.row;

    for (let j=0; j<=endPoint; j++) {

        if (j !== rowCurrentPlayer) {
            availableMoves.push(Square.at(j, colCurrentPlayer));
        }
    }
    return availableMoves;
}
exports.addDiagonalMoves = function (location) {
    let availableMoves = [];
    let endPoint = 7;
    let colCurrentPlayer = location.col;
    let rowCurrentPlayer = location.row;

    //left to right
    //Add one to both row and col until one of them hits 7
    let colStartPoint = colCurrentPlayer - rowCurrentPlayer;
    if (colStartPoint < 0) {
        colStartPoint = 0
    }
    let rowStartPoint = rowCurrentPlayer - colCurrentPlayer;
    if (rowStartPoint < 0) {
        rowStartPoint = 0
    }

    //stop the col value going above 7
    endPoint = 7 - colStartPoint;
    for (let i = rowStartPoint; i <= endPoint; i++) {
        if (colStartPoint !== colCurrentPlayer && i !== rowCurrentPlayer) {
            availableMoves.push(Square.at(i, colStartPoint));
        }
        colStartPoint++
    }

    //right to left
    //adding 1 to row, subtracting one from col until row hits 7 or col hits 0
    const sumOfColRow = rowCurrentPlayer + colCurrentPlayer
    if (sumOfColRow <= 7) {
        rowStartPoint = 0;
    } else {
        rowStartPoint = (rowCurrentPlayer + colCurrentPlayer) - 7;
    }

    colStartPoint = rowCurrentPlayer + colCurrentPlayer
    if (colStartPoint > 7) {
        colStartPoint=7;
    }
    endPoint = 7;
    for (let i = rowStartPoint; i <= endPoint; i++) {

        if (i !== rowCurrentPlayer && colStartPoint !== colCurrentPlayer) {
            availableMoves.push(Square.at(i, colStartPoint));
        }
        colStartPoint--
    }

    return availableMoves;
}
exports.removeOffBoardMoves = function (allAvailableMoves) {
    let availableMoves = [];
    let availableMovesFirstPass = [];

    availableMovesFirstPass = allAvailableMoves.filter(square => (square.row >= 0 && square.col >= 0));
    availableMoves = availableMovesFirstPass.filter(square => (square.row <= 7 && square.col <= 7));

    return availableMoves;
}
exports.removeVerticalBlockedMoves = function (allVerticalMoves, board, playerLocation) {
    // if a blocking piece is found remove all moves after it. If the blocking piece is friendly remove the square with the blocker on it too
    let verticalMoves = [];
    for (let i = 0; i <= allVerticalMoves.length - 1; i++) {
        let blockingPiece = board.getPiece(allVerticalMoves[i]);

        if (blockingPiece) {
            const blockLocation = Square.at(allVerticalMoves[i].row, allVerticalMoves[i].col);
            if (playerLocation.row > blockLocation.row) {
                //add all moves where row > the row of the blocker
                verticalMoves = allVerticalMoves.filter(square => (square.row >= blockLocation.row && square.col === blockLocation.col));
            } else {
                // add all moves where row < blocker row
                verticalMoves = allVerticalMoves.filter(square => (square.row <= blockLocation.row && square.col === blockLocation.col));
            }
            if (board.currentPlayer.description === blockingPiece.player.description) {
                verticalMoves.splice(i, 1);
            }
        }
    }
    if (verticalMoves.length === 0) {
        verticalMoves = allVerticalMoves;
    }
    return verticalMoves;
}
exports.removeHorizontalBlockedMoves = function (allHorizontalMoves, board, playerLocation) {
    // if a blocking piece is found remove all moves after it. If the blocking piece is friendly remove the square with the blocker on it too
    let horizontalMoves = [];
    for (let i = 0; i <= allHorizontalMoves.length - 1; i++) {
        let blockingPiece = board.getPiece(allHorizontalMoves[i]);

        if (blockingPiece) {
            const blockLocation = Square.at(allHorizontalMoves[i].row, allHorizontalMoves[i].col);
            if (playerLocation.row > blockLocation.row) {
                //add all moves where row > the row of the blocker
                horizontalMoves = allHorizontalMoves.filter(square => (square.row >= blockLocation.row && square.col === blockLocation.col));
            } else {
                // add all moves where row < blocker row
                horizontalMoves = allHorizontalMoves.filter(square => (square.row <= blockLocation.row && square.col === blockLocation.col));
            }
            if (playerLocation.col > blockLocation.col) {
                //add all moves where column > the column of the blocker
                horizontalMoves = allHorizontalMoves.filter(square => (square.col >= blockLocation.col && square.row === blockLocation.row));
            } else {
                // add all moves where column < blocker column
                horizontalMoves = allHorizontalMoves.filter(square => (square.col <= blockLocation.col && square.row === blockLocation.row));
            }
            if (board.currentPlayer.description === blockingPiece.player.description) {
                horizontalMoves.splice(i, 1);
            }
        }
    }
    if (horizontalMoves.length === 0) {
        horizontalMoves = allHorizontalMoves;
    }
    return horizontalMoves
}
exports.removeDiagonalBlockedMoves = function (allAvailableMoves, board, playerLocation) {
    // if a blocking piece is found remove all moves after it. If the blocking piece is friendly remove the square with the blocker on it too
    let availableMoves = [];
    for (let i = 0; i <= allAvailableMoves.length - 1; i++) {

        let blockingPiece = board.getPiece(allAvailableMoves[i]);
        if (blockingPiece) {
            const blockLocation = Square.at(allAvailableMoves[i].row, allAvailableMoves[i].col);
            // if row is higher
            if (playerLocation.row > blockLocation.row) {
                // if col is higher
                if (playerLocation.col > blockLocation.col) {
                    availableMoves = allAvailableMoves.filter(square => (square.row > blockLocation.row && square.col > blockLocation.col));
                // if col is lower
                } else {
                    availableMoves = allAvailableMoves.filter(square => (square.row > blockLocation.row && square.col < blockLocation.col));
                }
            // if row is lower
            } else {
                // if col is higher
                if (playerLocation.col > blockLocation.col) {
                    availableMoves = allAvailableMoves.filter(square => (square.row < blockLocation.row && square.col > blockLocation.col));
                // if col is lower
                } else {
                    availableMoves = allAvailableMoves.filter(square => (square.row < blockLocation.row && square.col < blockLocation.col));
                }
            }
            if (board.currentPlayer.description === blockingPiece.player.description) {
                availableMoves.splice(i, 1);
            }
        }
    }
    if (availableMoves.length === 0) {
        availableMoves = allAvailableMoves;
    }
    return availableMoves
}
