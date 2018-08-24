import { MOVE_PIECE } from '../actionstypes/piece';
import uuid from 'uuid/v4';

const generatePiece = type => ({ pieceId: uuid(), pieceType: type });

// TODO: make recursive
const create2DArrayWithNull = (firstSize, secondSize) => {
  const array = Array(firstSize)
    .fill(0)
    .map(() =>
      Array(secondSize)
        .fill(null)
    );

  array[0][0] = generatePiece('knight');
  array[1][0] = generatePiece('rook');
  array[2][0] = generatePiece('bishop');
  array[3][0] = generatePiece('king');
  array[4][0] = generatePiece('queen');
  array[5][0] = generatePiece('pawn');
  return array;
};

function piece(
  state = create2DArrayWithNull(8, 8),
  action
) {
  switch (action.type) {
    case MOVE_PIECE:
      return state.map((pieces, x) =>
        pieces.map((piece, y) => {
          if (piece !== null && piece.pieceId === action.id) {
            return null;
          }
          if (action.x === x && action.y === y) {
            return {
              pieceId: action.id,
              pieceType: action.pieceType
            };
          }
          return piece;
        })
      );
    default:
      return state;
  }
}

export default piece;