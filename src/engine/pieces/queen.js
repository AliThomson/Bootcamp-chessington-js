import Piece from './piece';
import Square from '../square';
import {addDiagonalMoves, addLateralMoves} from "./movesHelper";
import player from "../player";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let availableMoves = addLateralMoves(location, board);
        let diagonalMoves = addDiagonalMoves(location, board);
        availableMoves.push(...diagonalMoves);
        return availableMoves;

    }
}
