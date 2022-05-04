import Piece from './piece';
import {addLateralMoves, removeLateralBlockedMoves} from "./movesHelper";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let allAvailableMoves = addLateralMoves(location);
        let availableMoves = removeLateralBlockedMoves(allAvailableMoves, board, location);

        return availableMoves;
    }
}