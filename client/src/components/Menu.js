import React from 'react';
/**
 * A menu component containing what is displayed other than the canvas such as
 * 1. buttons (restat and join)
 * 2. number of players
 */

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
