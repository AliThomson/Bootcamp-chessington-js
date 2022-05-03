import Piece from './piece';
import {addDiagonalMoves, addLateralMoves} from "./movesHelper";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let availableMoves = addLateralMoves(location, board);
        let diagonalMoves = addDiagonalMoves(location, board);
        availableMoves.push(...diagonalMoves);
        return availableMoves;

    }
}
