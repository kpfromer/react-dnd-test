import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './BoardSquare';
import Knight from './pieces/Knight';
import { moveKnight, canMoveKnight } from './Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

export class Board extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  // renderPiece(x, y) {
  //   const [knightX, knightY] = this.props.knightPosition;
  //   if (x === knightX && y === knightY) {
  //     return <Knight id={uuid()} />;
  //   }
  // }

  // renderSquare(i) {
  //   const x = i % 8;
  //   const y = Math.floor(i / 8);
  //   return (
  //     <div key={i} onClick={() => this.handleSquareClick(x, y)}>
  //       <BoardSquare x={x} y={y}>
  //         {this.renderPiece(x, y)}
  //       </BoardSquare>
  //     </div>
  //   );
  // }

  renderPiece(x, y) {
    const piece = this.props.pieces[x][y];
    if (!piece) {
      return null;
    }
    if (piece.pieceType === 'knight') {
      return (
        <Knight id={piece.pieceId} />
      )
    } 
  }

  findPieceXY = id => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (this.props.pieces[x][y] && this.props.pieces[x][y].pieceId === id) {
          return { x, y };
        }
      }
    }
    return null;
  }

  canDrop = (fromX, fromY) => piece => {
    // console.log(piece);
    const { pieceId, pieceType } = piece;
    const item = this.findPieceXY(pieceId);
    // console.log(this.props.pieces);
    if (item) {
      const { x: toX, y: toY } = item;
      // TODO: extract
      const dx = fromX - toX;
      const dy = fromY - toY;
      switch (pieceType) {
        case 'knight':
          return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2);
        default:
          return false
      }
    }
    return false;
  }

  renderSquares() {
    // console.log(this.props.pieces);
    const squares = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const key = (x + 1) * 8 + (y + 1);
        squares.push(
          <div key={key}>
            <BoardSquare x={x} y={y} canMove={this.canDrop(x, y)}>
              {this.renderPiece(x, y)}
            </BoardSquare>
          </div>
        );
      }
    }
    return squares;
  }

  render() {
    // const squares = [];
    // for (let i = 0; i < 64; i++) {
    //   squares.push(this.renderSquare(i));
    // }

    // console.log(this.props.pieces);

    const squares = this.renderSquares();

    return (
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)',
          width: '50vw',
          height: '50vw'
        }}
      >
        {squares}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { piece } = state;
  return {
    pieces: piece
  };
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Board));