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
			id: "",
			joiningId: "",
			isGenerator: false,
			isJoiner: false
		}
		//console.log(props)
		this.updateScore = this.updateScore.bind(this);
		this.removeText = this.removeText.bind(this);
		this.genId = this.genId.bind(this);
		this.generateHandle = this.generateHandle.bind(this);
		this.falseIsGenerator = this.falseIsGenerator.bind(this);
		this.falseIsClicked = this.falseIsClicked.bind(this);
		this.falseIsJoiner = this.falseIsJoiner.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
		this.handleJoinId = this.handleJoinId.bind(this);
	}
	generateHandle() {
		this.setState({ isGenerator: true })
	}
	genId(id) {
		this.setState({ id: id });
		// let id = uuidv4().substring(0, 8);
		// this.setState({ id: id });
		// fetch('http://localhost:3000/generateId',
		// 	{
		// 		method: "POST",
		// 		body: JSON.stringify({
		// 			id: id
		// 		}),
		// 		headers: {
		// 			"Content-type": "application/json; charset=UTF-8"
		// 		}
		// 	})
	}
	handleJoin(e){
		this.setState({isJoiner: true});
	}
	handleJoinId(e){
		console.log(this.state.joiningId)
		this.setState({joiningId: e.target.value});
	}
	updateScore(score1, score2, didWin) {
		this.setState({
			player1Score: this.state.player1Score + score1,
			player2Score: this.state.player2Score + score2,
			totalGamePlayed: this.state.totalGamePlayed + score1 + score2,
			displayedText: (didWin ? "You won" : "You lost")
		});
	}
	removeText() {
		this.setState({ displayedText: "", isClicked: true });
	}

	falseIsClicked() {
		this.setState({ isClicked: false });
	}
	falseIsGenerator() {
		this.setState({ isGenerator: false });
	}
	falseIsJoiner() {
		this.setState({ isJoiner: false });
	}

	render() {
		return (
			<div className="dividing">
				<Menu removeText={this.removeText}
					generateHandle={this.generateHandle}
					gameId={this.state.id}
					handleJoin={this.handleJoin}
					handleJoinId={this.handleJoinId}
				/>
				<Tic updateScore={this.updateScore}
					isClicked={this.state.isClicked}
					falseIsClicked={this.falseIsClicked}
					genId={this.genId}
					isGenerator={this.state.isGenerator}
					falseIsGenerator={this.falseIsGenerator}
					isJoiner={this.state.isJoiner}
					falseIsJoiner={this.falseIsJoiner}
					joiningId = {this.state.joiningId}
				/>
				<Score
					player1Score={this.state.player1Score}
					player2Score={this.state.player2Score}
					totalGamePlayed={this.state.totalGamePlayed}
					text={this.state.displayedText}
				/>
			</div>
		);
	}
}


export default Game;