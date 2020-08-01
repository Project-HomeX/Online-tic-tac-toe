import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class WaitingRoom extends Component {
 
    render() {
       
        return (
            <div className="WhatingRoomContainer">
               
                    <input readOnly type="text" placeholder="link" aria-label="link"  value={"localhost:3000/game/"+this.props.userLink} />
                    <button>copy</button>
                    <br />
                    <button><Link to={"/game/" + this.props.userLink}>Start Game</Link></button>
            </div>
        )
    }
}

export default WaitingRoom
