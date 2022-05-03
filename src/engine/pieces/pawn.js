import Piece from './piece';
import Square from '../square';
import Player from "../player";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        let location = board.findPiece(this);
        if (this.player === Player.WHITE) {
            availableMoves.push(Square.at(location.row + 1, location.col))
            if(location.row === 1) {
                availableMoves.push(Square.at(location.row + 2, location.col))
            }
        } else {
            availableMoves.push(Square.at(location.row - 1, location.col))
            if(location.row === 6) {
                availableMoves.push(Square.at(location.row - 2, location.col))
            }
        }
        //for each square in availableMoves
        for (let i = 0; i <= availableMoves.length - 1; i++) {
            if (board.getPiece(availableMoves[i])) {
                if (i === 0){
                    availableMoves = [];
                } else {
                    availableMoves.splice(i, 1);
                }
            }
        }
        return availableMoves;
    }
}