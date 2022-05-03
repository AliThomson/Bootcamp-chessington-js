import Square from "../square";

exports.addLateralMoves = function (location, board) {
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
exports.addDiagonalMoves = function (location, board) {
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

    endPoint = j;
    for (let i = 0; i <= endPoint; i++) {

        if (i !== rowStartPoint && j !== colStartPoint) {

            availableMoves.push(Square.at(i, j));
        }
        j--
    }
    //console.log(availableMoves)
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
