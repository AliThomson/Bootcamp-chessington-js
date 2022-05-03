import Piece from './piece';
import Square from '../square';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        let location = board.findPiece(this);
        let endPoint = 7;
        let colStartPoint = location.col;
        let rowStartPoint = location.row;

        //left to right
        //Add one to both row and col until one of them hits 7
        let j = colStartPoint - rowStartPoint;

        //stop the col value going above 7
        endPoint = 7 - j;
        for(let i = 0; i <= endPoint; i++){

            if(j !== colStartPoint && i !== rowStartPoint) {

                availableMoves.push(Square.at( i, j));
            }
            j++
        }

        //right to left
        //adding 1 to row, subtracting one from col until row hits 7 or col hits 0
        j = (rowStartPoint + colStartPoint)

        endPoint = j;
        for (let i=0; i<=endPoint; i++) {

            if(i !== rowStartPoint && j !== colStartPoint) {

                availableMoves.push(Square.at( i ,  j));
            }
            j--
        }
        //console.log(availableMoves)
        return availableMoves;
    }
}
