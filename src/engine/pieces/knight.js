import Piece from './piece';
import Square from '../square';
import {removeOffBoardMoves} from "./movesHelper";

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allAvailableMoves = [];
        let location = board.findPiece(this)

        //There are 4 rows of squares

        //row #1 is 2 rows behind the start and the column value is 1 to the left
        let rowStartPoint = location.row-2;
        let colStartPoint = location.col-1;

        //There are 2 column values for each row value
        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint));
        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint+2));

        //row #2 is 1 row behind the start and the column value is 2 to the left
        rowStartPoint = location.row-1;
        colStartPoint = location.col-2;

        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint));
        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint+4));

        //row #3 is 1 row ahead of the start and the column value is still 2 to the left
        rowStartPoint = location.row+1;

        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint));
        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint+4));

        //row #4 is 2 rows ahead of the start and the column value is now 1 to the left
        rowStartPoint = location.row+2;
        colStartPoint = location.col-1;

        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint));
        allAvailableMoves.push(Square.at(rowStartPoint, colStartPoint+2));

        // we need to remove any squares that fall outside the board (<0 or >7)
        const availableMoves = removeOffBoardMoves(allAvailableMoves);

        return availableMoves;
    }
}
