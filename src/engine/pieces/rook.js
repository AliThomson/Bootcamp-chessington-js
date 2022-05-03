import Piece from './piece';
import Square from '../square';
import {addLateralMoves, removeBlockedMoves} from "./movesHelper";
import Player from "../player";


export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const location = board.findPiece(this);
        let allAvailableMoves = addLateralMoves(location);
        let availableMoves = removeBlockedMoves(allAvailableMoves, board, location);

        return availableMoves;
    }
}
