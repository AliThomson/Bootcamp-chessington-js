import Piece from './piece';
import {
    addVerticalMoves,
    removeVerticalBlockedMoves,
    addHorizontalMoves,
    removeHorizontalBlockedMoves,
    addDiagonalMoves,
    removeDiagonalBlockedMoves, removeOffBoardMoves
} from "./movesHelper";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let allVerticalMoves = addVerticalMoves(location);
        let verticalMoves = removeVerticalBlockedMoves(allVerticalMoves, board, location);
        let allHorizontalMoves = addHorizontalMoves(location);
        let horizontalMoves = removeHorizontalBlockedMoves(allHorizontalMoves, board, location);
        let allDiagonalMoves = addDiagonalMoves(location);
        let availableMovesFirstPass = removeDiagonalBlockedMoves(allDiagonalMoves, board, location);
        let availableMoves = removeOffBoardMoves(availableMovesFirstPass)
        availableMoves.push(...verticalMoves);
        availableMoves.push(...horizontalMoves);

        return availableMoves;
    }
}
