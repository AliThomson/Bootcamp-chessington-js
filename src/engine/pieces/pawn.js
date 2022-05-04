import Piece from './piece';
import Square from '../square';
import Player from "../player";
import {removeOffBoardMoves} from "./movesHelper";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let allAvailableMoves = [];
        let location = board.findPiece(this);
        if (this.player === Player.WHITE) {
            allAvailableMoves.push(Square.at(location.row + 1, location.col))
            if(location.row === 1) {
                allAvailableMoves.push(Square.at(location.row + 2, location.col))
            }
        } else {
            allAvailableMoves.push(Square.at(location.row - 1, location.col))
            if(location.row === 6) {
                allAvailableMoves.push(Square.at(location.row - 2, location.col))
            }
        }

        let availableMoves = removeOffBoardMoves(allAvailableMoves);

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