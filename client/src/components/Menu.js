// This component is supposed to represent each squares
import React from 'react';
import Button from 'react-bootstrap/Button'



class Menu extends React.Component {

    render() {
        let playerCount = this.props.playerCount;
        return (
            <div>
                <h1>{playerCount} player{playerCount == 1 ? "" : "s"} in this room</h1>
                <Button variant="primary" onClick={this.props.removeText}>Restart</Button> <br />
                <button onClick={this.props.handleJoin}> Join</button>
                <input type="text" onChange={this.props.handleJoinId} /> <br />
                <button onClick={this.props.generateHandle}> Generate</button>
                <input readOnly value={this.props.gameId} type="text" max="6" />

            </div>

        )
    }
}

export default Menu;
