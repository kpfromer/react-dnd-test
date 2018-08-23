import { MOVE_PIECE } from '../actionstypes/piece';

export const movePiece = (id, pieceType, x, y) => ({
  type: MOVE_PIECE,
  id,
  pieceType,
  x,
  y
})