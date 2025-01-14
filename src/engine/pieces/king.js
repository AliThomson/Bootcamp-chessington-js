import Piece from './piece';
import Square from '../square';
import {removeOffBoardMoves} from "./movesHelper";

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allAvailableMoves = [];
        let location = board.findPiece(this)
        let rowStartPoint = location.row-1;
        let colStartPoint = location.col-1;

        for (let i=0; i<=2; i++) {
            for (let j=0; j<=2; j++) {

                if (i!==1 || j!==1) {
                    allAvailableMoves.push(Square.at(rowStartPoint + i, colStartPoint + j));
                }
            }
        }
        const availableMoves = removeOffBoardMoves(allAvailableMoves);
        return availableMoves;
    }
}
