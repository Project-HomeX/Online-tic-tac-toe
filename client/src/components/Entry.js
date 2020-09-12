import React, { Component } from 'react'
import { Link } from 'react-router-dom'

/* An entry component.
    when a game is started, the page is first loaded, this the component that will appear

    A user has three optional ways of playing the game.
    1. remotly with 
 */

var EntryContainer = {
    display: 'flex',
    justifyContent: 'center',
    padding: '4em'
}
var EntryChildContainer = {
    color:'white',
    padding: '1em',
}
const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '1em',
}
export class Entry extends Component {
    render() {
        return (
            <div style={EntryContainer}>
                <div style={EntryChildContainer}>
                    <h1>Welcome to Tic Tact Toe Online</h1>
                    <Link style={linkStyle} to="/WaitingRoom"><button type="button" class="btn btn-primary btn-sm btn-block">Play A friend Remotly</button></Link>
                    <Link style={linkStyle} to="/RandomGame"><button type="button" class="btn btn-primary btn-sm btn-block">Join Random Game</button></Link>
                    <Link style={linkStyle} to="/LocalGame"><button type="button" class="btn btn-primary btn-sm btn-block">Play a friend locally</button></Link>
                </div>
            </div>
            
        )
    }
}
export default Entry
