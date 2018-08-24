import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    return { pieceId: props.id, pieceType: props.type };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export class Piece extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'pawn',
      'knight',
      'bishop',
      'rook',
      'queen',
      'king'
    ]).isRequired
  }

  getPieceEmoji = () => {
    switch (this.props.type) {
      case 'king':
        return '♔';
      case 'queen':
        return '♕';
      case 'knight':
        return '♘';
      case 'bishop':
        return '♗';
      case 'rook':
        return '♖';
      case 'pawn':
        return '♙';
    }
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: '4vw',
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        {this.getPieceEmoji()}
      </div>
    )
  }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Piece);