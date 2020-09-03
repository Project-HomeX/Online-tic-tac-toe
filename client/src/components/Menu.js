// This component is supposed to represent each squares
import React from 'react';

class Menu extends React.Component {

    render() {
        let playerCount = this.props.playerCount;
        
        return (
            <div>
                {this.props.single?"": (<h1>{playerCount} player{playerCount === 1? "" : "s"} in this room</h1>)}
                <button type="button" class="btn btn-outline-primary" style={{margin:"auto auto 2em 1em"}} variant="primary" onClick={this.props.removeText}>Restart</button> <br />
                {this.props.single?"": ( <button type="button" class="btn btn-outline-primary"  onClick={this.props.handleJoin}> Join</button>)}
            </div>

        )
    }
}

export default Menu;
