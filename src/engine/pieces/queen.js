import Piece from './piece';
import {addDiagonalMoves, addLateralMoves} from "./movesHelper";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let availableMoves = addLateralMoves(location);
        let diagonalMoves = addDiagonalMoves(location);
        availableMoves.push(...diagonalMoves);
        return availableMoves;

    }
}
