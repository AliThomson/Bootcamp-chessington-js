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
        let alDiagonalMoves = [];
        let location = board.findPiece(this);
        if (this.player === Player.WHITE) {
            allAvailableMoves.push(Square.at(location.row + 1, location.col))
            // add in diagonal moves here - add to available moves if opposing piece present
            alDiagonalMoves.push(Square.at(location.row + 1, location.col +1))
            alDiagonalMoves.push(Square.at(location.row + 1, location.col -1))
            if(location.row === 1) {
                allAvailableMoves.push(Square.at(location.row + 2, location.col))
            }
        } else {
            allAvailableMoves.push(Square.at(location.row - 1, location.col))
            // add in diagonal moves here - add to available moves if opposing piece present
            alDiagonalMoves.push(Square.at(location.row - 1, location.col +1))
            alDiagonalMoves.push(Square.at(location.row - 1, location.col -1))
            if(location.row === 6) {
                allAvailableMoves.push(Square.at(location.row - 2, location.col))
            }
        }

        let availableMoves = removeOffBoardMoves(allAvailableMoves);
        for (let i = 0; i <= availableMoves.length - 1; i++) {
            if (board.getPiece(availableMoves[i])) {
                // remove blocked moves
                if (i === 0){
                    availableMoves = [];
                } else {
                    availableMoves.splice(i, 1);
                }
            }
        }

        let diagonalMoves = removeOffBoardMoves(alDiagonalMoves);

        // add moves where opposing piece is diagonal to current player
        for (let i = 0; i <= diagonalMoves.length - 1; i++) {
            let opposingPiece = board.getPiece(diagonalMoves[i]);
            if (opposingPiece && board.currentPlayer.description !== opposingPiece.player.description) {
                availableMoves.push(diagonalMoves[i]);
            }
        }
        return availableMoves;
    }
}