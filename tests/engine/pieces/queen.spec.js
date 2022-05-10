import 'chai/register-should';
import Queen from '../../../src/engine/pieces/queen';
import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import GameSettings from '../../../src/engine/gameSettings';
import Bishop from "../../../src/engine/pieces/bishop";

describe('Queen', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move laterally', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 3), queen);

        const moves = queen.getAvailableMoves(board);

        const expectedMoves = [
            // Horizontal
            Square.at(2, 0), Square.at(2, 1), Square.at(2, 2), Square.at(2, 4), Square.at(2, 5), Square.at(2, 6), Square.at(2, 7),
            // Vertical
            Square.at(0, 3), Square.at(1, 3), Square.at(3, 3), Square.at(4, 3), Square.at(5, 3), Square.at(6, 3), Square.at(7, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });
    it('can move laterally off start row', () => {
        const queen = new Queen(Player.WHITE);
        const friendlyPiece1 = new Pawn(Player.WHITE);
        const friendlyPiece2 = new Pawn(Player.WHITE);
        const friendlyPiece3 = new Pawn(Player.WHITE);
        board.setPiece(Square.at(0, 3), queen);
        board.setPiece(Square.at(1, 2), friendlyPiece1);
        board.setPiece(Square.at(1, 4), friendlyPiece2);
        board.setPiece(Square.at(3, 3), friendlyPiece3);

        const moves = queen.getAvailableMoves(board);

        const expectedMoves = [
            // Horizontal
            Square.at(0, 0), Square.at(0, 1), Square.at(0, 2), Square.at(0, 4), Square.at(0, 5), Square.at(0, 6), Square.at(0, 7),
            // Vertical
            Square.at(1, 3), Square.at(2, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('can move diagonally', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 3), queen);

        const moves = queen.getAvailableMoves(board);

        const expectedMoves = [
            // Forwards diagonal
            Square.at(0, 1), Square.at(1, 2), Square.at(3, 4), Square.at(4, 5), Square.at(5, 6), Square.at(6, 7),
            // Backwards diagonal
            Square.at(0, 5), Square.at(1, 4), Square.at(3, 2), Square.at(4, 1), Square.at(5, 0)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(2, 3), queen);

        const moves = queen.getAvailableMoves(board);

        moves.should.have.length(25);
    });

    it('cannot move through friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), friendlyPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('cannot move through opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });
    it('cannot take friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece1 = new Pawn(Player.BLACK);
        const opposingPiece2 = new Pawn(Player.BLACK);
        const friendlyPiece1 = new Pawn(Player.WHITE);
        const friendlyPiece2 = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(2, 2), opposingPiece1);
        board.setPiece(Square.at(4, 2), opposingPiece2);
        board.setPiece(Square.at(2, 6), friendlyPiece1);
        board.setPiece(Square.at(4, 6), friendlyPiece2);

        const moves = queen.getAvailableMoves(board);
        const unexpectedMoves = [Square.at(2, 6), Square.at(4, 6)];

        moves.should.not.deep.include.members(unexpectedMoves);
    });
});