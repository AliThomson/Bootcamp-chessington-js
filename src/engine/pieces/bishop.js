import Piece from './piece';
import {addDiagonalMoves, removeDiagonalBlockedMoves} from "./movesHelper";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const allAvailableMoves = addDiagonalMoves(location);
        const availableMoves = removeDiagonalBlockedMoves(allAvailableMoves, board, location);
        return availableMoves;
    }
}
