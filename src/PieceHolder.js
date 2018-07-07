import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class PieceHolder extends Component {
  render() {
    return (
      <div>
        {this.props.pieceValue}
      </div>
    );
  }
}
