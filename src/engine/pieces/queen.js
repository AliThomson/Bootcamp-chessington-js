import Piece from './piece';
import {addDiagonalMoves, addLateralMoves, removeDiagonalBlockedMoves, removeLateralBlockedMoves} from "./movesHelper";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let allAvailableMoves = addLateralMoves(location);
        let diagonalMoves = addDiagonalMoves(location);
        allAvailableMoves.push(...diagonalMoves);
        let availableMovesFirstPass = removeLateralBlockedMoves(allAvailableMoves, board, location);
        let availableMoves = removeDiagonalBlockedMoves(availableMovesFirstPass, board, location);
        return availableMoves;

    }
}
