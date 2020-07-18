//This is supposed to represent the game from one client side.
import React from 'react';
import Board from './Board';
import { NavLink } from "react-router-dom";
class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            matrix: [[0 , 0 , 0], [0, 0 , 0], [0, 0, 0]],
            flag: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        let u = e.target.name.split(",");
        let x = parseInt(u[0]);
        let y = parseInt(u[1]);
        if(this.state.matrix[x][y] == 0){
            console.log("x: " + x + " y: " + y);
            if(this.state.flag){
                this.state.matrix[x][y] = 1;
            }else{
                this.state.matrix[x][y] = -1;
            }
        }
        
    }

    render(){
        return (
            <div>
                <Board matrix = {this.state.matrix} handler = {this.handleClick}/>
            </div>
        )
    }
}
            
export default Game;