import Piece from './piece';
import {
    addVerticalMoves,
    removeVerticalBlockedMoves,
    addHorizontalMoves,
    removeHorizontalBlockedMoves, addDiagonalMoves, removeDiagonalBlockedMoves
} from "./movesHelper";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let allVerticalMoves = addVerticalMoves(location);
        let verticalMoves = removeVerticalBlockedMoves(allVerticalMoves, board, location);
        let allHorizontalMoves = addHorizontalMoves(location);
        let availableMoves = removeHorizontalBlockedMoves(allHorizontalMoves, board, location);

        availableMoves.push(...verticalMoves);

        return availableMoves;
    }
}