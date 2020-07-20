//This is supposed to represent the game from one client side.
import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import Tic from './Tic';
import Board from './Board';
import { NavLink } from "react-router-dom";
class Game extends React.Component{

	render() {
		return (
			<div>
				<Tic/>
			</div>
		);
	}
}            
export default Game;