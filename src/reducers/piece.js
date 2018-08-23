import { MOVE_PIECE } from '../actionstypes/piece';
import uuid from 'uuid/v4';

const createNthDArrayWithNull = (...sizes) => {
  const array = Array(sizes[0]);
  if (sizes.length === 1) {
    return array.fill(null);
  }
  return array
    .fill(0)
    .map(() =>
      create2DArrayWithNull(sizes.slice(1))
    );
}

// TODO: make recursive
const create2DArrayWithNull = (firstSize, secondSize) => {
  const array = Array(firstSize)
    .fill(0)
    .map(() =>
      Array(secondSize)
        .fill(null)
    );

  array[0][0] = {
    pieceId: uuid(),
    pieceType: 'knight'
  }
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