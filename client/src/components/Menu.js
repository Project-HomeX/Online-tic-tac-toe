// This component is supposed to represent each squares
import React from 'react';
import './Game.css'
import Button from 'react-bootstrap/Button'



class Menu extends React.Component {

    render() {
        let playerCount = this.props.playerCount;
        
        return (
            <div>
                
                <button type="button" class="btn btn-outline-primary" /*style={{margin:"auto auto 2em 1em"}}*/ variant="primary" onClick={this.props.removeText}>Restart</button> <br />
                {this.props.single?"": ( <button type="button" class="btn btn-outline-primary"  onClick={this.props.handleJoin}> Join</button>)}
                {this.props.single?"": (<h3>{playerCount} player{playerCount == 1? "" : "s"} in this room</h3>)}
                {/* <input type="text" onChange = {this.props.handleJoinId}/> <br /> */}
                {/* <button onClick={this.props.generateHandle}> Generate</button> */}
                {/* <input readOnly value={this.props.gameId} type="text" max="6" /> */}

            </div>

        )
    }
}

export default Menu;
