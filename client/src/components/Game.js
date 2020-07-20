//This is supposed to represent the game from one client side.
import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import Tic from './Tic';

import Menu from './Menu'
import './Game.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Score from './Score';
class Game extends React.Component{

	render() {
		return (
			<div className = "dividing">
				<Menu/>
				<Tic/>
				<Score/>
			</div>
		);
	}
}       


export default Game;