import React from 'react';
import Tic from './Tic';
import TicSinglPlayerF from './TicSinglPlayerF'
import Menu from './Menu'
import './Game.css'
import Score from './Score';

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
			isJoiner: false,
			roomId: "",
			playerCount: 0
		}
		this.updateScore = this.updateScore.bind(this);
		this.removeText = this.removeText.bind(this);
		this.genId = this.genId.bind(this);
		this.generateHandle = this.generateHandle.bind(this);
		this.falseIsGenerator = this.falseIsGenerator.bind(this);
		this.falseIsClicked = this.falseIsClicked.bind(this);
		this.falseIsJoiner = this.falseIsJoiner.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
		this.handleJoinId = this.handleJoinId.bind(this);
		this.setRoomId = this.setRoomId.bind(this);
		this.setPlayerCount = this.setPlayerCount.bind(this);

	}
	generateHandle() {
		this.setState({ isGenerator: true });
	}
	setPlayerCount(count) {
		this.setState({ playerCount: count });
	}
	setRoomId(roomId) {
		this.setState({ roomId: roomId });
	}

	genId(id) {
		this.setState({ id: id });
	}
	handleJoin(e) {
		this.setState({ isJoiner: true });
	}
	handleJoinId(e) {
		console.log(this.state.joiningId)
		this.setState({ joiningId: e.target.value });
	}
	updateScore(score1, score2, didWin) {
		if(!this.props.single){
			this.setState({
				displayedText: (didWin ? "You won" : "You lost")
			})
		}
		this.setState({
			player1Score: this.state.player1Score + score1,
			player2Score: this.state.player2Score + score2,
			totalGamePlayed: this.state.totalGamePlayed + score1 + score2
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
		let TicToDisplay;
		if (this.props.single) {
			TicToDisplay = <TicSinglPlayerF updateScore={this.updateScore}
				isClicked={this.state.isClicked}
				falseIsClicked={this.falseIsClicked}
			/>
		}
		else {
			TicToDisplay = <Tic updateScore={this.updateScore}
				isClicked={this.state.isClicked}
				falseIsClicked={this.falseIsClicked}
				genId={this.genId}
				isGenerator={this.state.isGenerator}
				falseIsGenerator={this.falseIsGenerator}
				isJoiner={this.state.isJoiner}
				falseIsJoiner={this.falseIsJoiner}
				joiningId={this.state.joiningId}
				id={this.state.id}
				roomId={this.state.roomId}
				setRoomId={this.setRoomId}
				playerCount={this.state.playerCount}
				setPlayerCount={this.setPlayerCount}
			/>
		}
		return (
			<div className="dividing">
				<Menu removeText={this.removeText}
					generateHandle={this.generateHandle}
					gameId={this.state.id}
					handleJoin={this.handleJoin}
					handleJoinId={this.handleJoinId}
					playerCount={this.state.playerCount}
					single = {this.props.single}
				/>

				{TicToDisplay}
				<Score
					player1Score={this.state.player1Score}
					player2Score={this.state.player2Score}
					totalGamePlayed={this.state.totalGamePlayed}
					text={this.state.displayedText}
					single={this.props.single}
				/>
			</div>
		);
	}
}


export default Game;