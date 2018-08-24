import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { movePiece } from '../actions/piece';
import { connect } from 'react-redux';

// TODO: MOVE TO OWN FILE
const canMove = (piece, toX, toY) => {
  const dx = piece.x - toX;
  const dy = piece.y - toY;
  switch(piece) {
    case 'knight':
      return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2);
    default: 
      return false
  }
}

const squareTarget = {
  canDrop(props, monitor) {
    return props.canMove(monitor.getItem());
  },
  drop(props, monitor) {
    console.log(props);
    const { pieceId, pieceType } = monitor.getItem();
    console.log(monitor.getItem());
    props.move(pieceId, pieceType, props.x, props.y);
  }
};


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class HighlightSquare extends Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: this.props.color,
      }} />
    )
  }
}

export class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  render() {
    const { x, y, connectDropTarget, isOver, canDrop, test } = this.props;
    const black = (x + y) % 2 === 1;

    const isValid = !isOver && canDrop && <HighlightSquare color="yellow" />;
    const squareHighlight = isOver ? <HighlightSquare color={canDrop ? 'green' : 'red'} /> : null;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {/* If hovered over display a yellow box */}
        {squareHighlight}
        {isValid}
      </div>
    );
  }
}

export default connect(undefined, { move: movePiece })(DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare));