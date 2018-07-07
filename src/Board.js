import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PieceHolder from './PieceHolder';
import _ from 'lodash';
import Parser from 'html-react-parser';

export default class Board extends Component {
  constructor (props){
    super(props);
    this.state = {pieceValue:"",
    currentTurn : true,
    vboard : Array(Array(3),Array(3),Array(3)),
    winnerText : "",
    showing: false
    };
    this.onClickCell.bind(this);
    this.checkWinner.bind(this);
    //this.drawBoard.bind(this);
  }


  onClickCell(x,y){
    var tempBoard = this.state.vboard;
    if(this.state.currentTurn){
      //this.state.vboard[x][y] = "X"
      tempBoard[x][y] = "X";
    //  this.setState({pieceValue:"X"});
      this.setState({currentTurn:false});
    } else{
      tempBoard[x][y] = "O"
    //  this.setState({pieceValue:"O"});
      this.setState({currentTurn:true});
    }
    this.setState({vboard:tempBoard},this.checkWinner);
  }
  checkWinner(){
    for(let i=0;i<this.state.vboard.length;i++){
      //var xwin = ;
      var vertArrX = [];
      var vertArrO = [];
      for(let x=0;x<this.state.vboard[i].length;x++){
        if(this.state.vboard[i][x] == 'X'){
          vertArrX.push(x);
        }
        if(this.state.vboard[i][x] == 'O'){
          vertArrO.push(x);
        }
      }
      ///check for the diags directly
      var xwinsDiag = ((this.state.vboard[0][0] == "X" && this.state.vboard[1][1] == "X" && this.state.vboard[2][2] == "X") || (this.state.vboard[0][2] == "X" && this.state.vboard[1][1] == "X" && this.state.vboard[2][0] == "X")) ? true : false;
      var owinsDiag = ((this.state.vboard[0][0] == "O" && this.state.vboard[1][1] == "O" && this.state.vboard[2][2] == "O") || (this.state.vboard[0][2] == "O" && this.state.vboard[1][1] == "O" && this.state.vboard[2][0] == "O")) ? true : false;
      if(_.every(this.state.vboard[i],(r)=> r == 'X') || (vertArrX.length === 3) || xwinsDiag){
        this.setState({winnerText:"X Wins"});
      }else if(_.every(this.state.vboard[i],(r)=> r == 'O') || (vertArrO.length === 3) || owinsDiag){
        this.setState({winnerText:"O Wins"});
      }
    }
  }

  render() {
    return (
      <div className="board">
        <table className="t-board">
        <tbody>
        <tr>
          <td onClick={()=>this.onClickCell(0,0)}><PieceHolder pieceValue={this.state.vboard[0][0]}></PieceHolder></td>
          <td onClick={()=>this.onClickCell(0,1)}><PieceHolder pieceValue={this.state.vboard[0][1]}></PieceHolder></td>
          <td onClick={()=>this.onClickCell(0,2)}><PieceHolder pieceValue={this.state.vboard[0][2]}></PieceHolder></td>
        </tr>
        <tr>
          <td onClick={()=>this.onClickCell(1,0)}><PieceHolder pieceValue={this.state.vboard[1][0]}></PieceHolder></td>
          <td onClick={()=>this.onClickCell(1,1)}><PieceHolder pieceValue={this.state.vboard[1][1]}></PieceHolder></td>
          <td onClick={()=>this.onClickCell(1,2)}><PieceHolder pieceValue={this.state.vboard[1][2]}></PieceHolder></td>
        </tr>
        <tr>
          <td onClick={()=>this.onClickCell(2,0)}><PieceHolder pieceValue={this.state.vboard[2][0]}></PieceHolder></td>
          <td onClick={()=>this.onClickCell(2,1)}><PieceHolder pieceValue={this.state.vboard[2][1]}></PieceHolder></td>
          <td onClick={()=>this.onClickCell(2,2)}><PieceHolder pieceValue={this.state.vboard[2][2]}></PieceHolder></td>
        </tr>
        </tbody>
        </table>
        <div>
          {this.state.winnerText}
          <br />
          <button onClick="" >Reset</button>
        </div>
      </div>
    );
  }
}
