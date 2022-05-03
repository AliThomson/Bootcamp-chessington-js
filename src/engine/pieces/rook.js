import Piece from './piece';
import Square from '../square';


export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        let location = board.findPiece(this);
        let endPoint = 7;
        let colStartPoint = location.col;
        let rowStartPoint = location.row;

        //HORIZONTAL
        for (let i=0; i<=endPoint; i++) {

            if (i !== colStartPoint) {
                availableMoves.push(Square.at(rowStartPoint, i));
            }
        }

        //VERTICAL
        for (let j=0; j<=endPoint; j++) {

            if (j !== rowStartPoint) {
                availableMoves.push(Square.at(j, colStartPoint));
            }
        }
        return availableMoves;
    }
}
