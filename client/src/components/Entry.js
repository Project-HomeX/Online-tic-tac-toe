    import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Game from './Game'
var EntryContainer = {
    display: 'flex',
    justifyContent: 'center',
    padding: '4em'
   // top: '50%',
   // transform: 'translate(-50%, -50%)'
}
var EntryChildContainer = {
    color:'white',
    padding: '1em',
    
   // maxWidth: '80%',
}
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
export class Entry extends Component {
    render() {
        return (
            <div style={EntryContainer}>
                <div style={EntryChildContainer}>
                    <h1>Welcome to Tic Tact Toe Online</h1>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    <button type="button" class="btn btn-primary btn-sm btn-block"><Link style={linkStyle} to="/WaitingRoom">Play A friend Remotly</Link></button>
                    <button type="button" class="btn btn-primary btn-sm btn-block"><Link style={linkStyle} to="/RandomGame">Join Random Game</Link></button>
                    <button type="button" class="btn btn-primary btn-sm btn-block"><Link style={linkStyle} to="/LocalGame">Play a friend locally</Link></button>
                </div>
            </div>
            
        )
    }
}
export default Entry
