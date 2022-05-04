import Square from "../square";

exports.addLateralMoves = function (location) {
    let availableMoves = [];
    let endPoint = 7;
    let colStartPoint = location.col;
    let rowStartPoint = location.row;

    //HORIZONTAL
    for (let i=0; i<=endPoint; i++) {

        if (i !== colStartPoint) {
            availableMoves.push(Square.at(rowStartPoint, i));
        }
    }

    //VERTICAL
    for (let j=0; j<=endPoint; j++) {

        if (j !== rowStartPoint) {
            availableMoves.push(Square.at(j, colStartPoint));
        }
    }
    return availableMoves;
}
exports.addDiagonalMoves = function (location) {
    let availableMoves = [];
    let endPoint = 7;
    let colStartPoint = location.col;
    let rowStartPoint = location.row;

    //left to right
    //Add one to both row and col until one of them hits 7
    let j = colStartPoint - rowStartPoint;

    //stop the col value going above 7
    endPoint = 7 - j;
    for (let i = 0; i <= endPoint; i++) {
        if (j !== colStartPoint && i !== rowStartPoint) {
            availableMoves.push(Square.at(i, j));
        }
        j++
    }

    //right to left
    //adding 1 to row, subtracting one from col until row hits 7 or col hits 0
    j = (rowStartPoint + colStartPoint)
    if (j > 7) {
        j=7;
    }
    endPoint = j;
    for (let i = 0; i <= endPoint; i++) {

        if (i !== rowStartPoint && j !== colStartPoint) {
            availableMoves.push(Square.at(i, j));
        }
        j--
    }

    return availableMoves;
}
exports.removeOffBoardMoves = function (availableMoves) {
    for (let i = 0; i <= availableMoves.length - 1; i++) {
        if (availableMoves[i].row < 0 || availableMoves[i].row > 7) {
            availableMoves.splice(i, 1);
        }
        if (availableMoves[i].col < 0 || availableMoves[i].col > 7) {
            availableMoves.splice(i, 1);
        }
        return availableMoves;
    }
}
exports.removeLateralBlockedMoves = function (allAvailableMoves, board, location) {
    // if a blocking piece is found remove all moves after it. If the blocking piece is friendly remove the square with the blocker on it too
    let availableMoves = [];
    for (let i = 0; i <= allAvailableMoves.length - 1; i++) {
        let blockingPiece = board.getPiece(allAvailableMoves[i]);

        if (blockingPiece) {
            const blockLocation = Square.at(allAvailableMoves[i].row, allAvailableMoves[i].col);
            if (location.row > allAvailableMoves[i].row) {
                //add all moves where row > the row of the blocker
                availableMoves = allAvailableMoves.filter(square => square.row > blockLocation.row);
            } else {
                // add all moves where row < blocker row
                availableMoves = allAvailableMoves.filter(square => square.row < blockLocation.row);
            }
            if (location.col > allAvailableMoves[i].col) {
                //add all moves where column > the column of the blocker
                availableMoves = allAvailableMoves.filter(square => square.col > blockLocation.col);
            } else {
                // add all moves where column < blocker column
                availableMoves = allAvailableMoves.filter(square => square.col < blockLocation.col);
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
