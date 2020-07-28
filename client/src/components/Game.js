//This is supposed to represent the game from one client side.
import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import Tic from './Tic';
import { v4 as uuidv4 } from 'uuid';
import Menu from './Menu'
import './Game.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Score from './Score';


//import { post } from '../../../server/routes';
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player1Score: 0,
			player2Score: 0,
			totalGamePlayed: 0,
			displayedText: "",
			isClicked: false,
			id: ""
		}
		//console.log(props)
		this.updateScore = this.updateScore.bind(this);
		this.removeText = this.removeText.bind(this);
		this.falseIsClicked = this.falseIsClicked.bind(this);
		this.genId = this.genId.bind(this);
	} 
	
	genId(){
		let id = uuidv4().substring(0,8);
		this.setState({id: id});
		fetch('http://localhost:3000/generateId', 
			{
				method: "POST", 
				body: JSON.stringify({ 	
					id: id
				}), 
				headers: { 
					"Content-type": "application/json; charset=UTF-8"
				} 
			})
    }
	updateScore(score1, score2) {
		this.setState({
			player1Score: this.state.player1Score + score1,
			player2Score: this.state.player2Score + score2,
			totalGamePlayed: this.state.totalGamePlayed + score1 + score2,
			displayedText: "player" + (score1 == 1? "1 " : "2 ") + " has Won"
		});
	}
	removeText(){
		this.setState({displayedText: "", isClicked : true});
	}

	falseIsClicked(){
		this.setState({isClicked: false});
	}

	render() {
		return (
			<div className="dividing">
				<Menu removeText ={this.removeText} genId = {this.genId} gameId = {this.state.id}/>
				<Tic updateScore={this.updateScore} 
					isClicked = {this.state.isClicked}
					 falseIsClicked = {this.falseIsClicked}
					 />
				<Score
					player1Score={this.state.player1Score}
					player2Score={this.state.player2Score}
					totalGamePlayed={this.state.totalGamePlayed}
					text = {this.state.displayedText}
				/>
			</div>
		);
	}
}


export default Game;