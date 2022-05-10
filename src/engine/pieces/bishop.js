import Piece from './piece';
import {addDiagonalMoves, removeDiagonalBlockedMoves, removeOffBoardMoves} from "./movesHelper";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const allAvailableMoves = addDiagonalMoves(location);
        const availableMovesFirstPass = removeOffBoardMoves(allAvailableMoves);
        const availableMoves = removeDiagonalBlockedMoves(availableMovesFirstPass, board, location);
        return availableMoves;
    }
}
