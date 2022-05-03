import Piece from './piece';
import Square from '../square';
import {addLateralMoves} from "./movesHelper";


export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        const availableMoves = addLateralMoves(location, board);
        return availableMoves;
    }
}
