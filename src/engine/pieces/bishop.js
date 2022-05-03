import Piece from './piece';
import {addDiagonalMoves} from "./movesHelper";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const availableMoves = addDiagonalMoves(location);
        return availableMoves;
    }
}
