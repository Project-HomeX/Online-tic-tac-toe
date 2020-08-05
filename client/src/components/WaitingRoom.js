import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from "react-copy-to-clipboard";
import './Game.css'
export class WaitingRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "localhost:3000/game/" + props.userLink,
            copied: false,
        };
    }
    
    render() {

        return (
            <div className="WhatingRoomContainer">
                <p>To get started with the game share the link and press the Start Game button</p>
                <div class="input-group mb-2">
                    <input readOnly value={this.state.value}
                        type="text" class="form-control" placeholder="Recipient's username"
                        aria-label="Recipient's username" aria-describedby="basic-addon2"
                    />
                    <CopyToClipboard text={this.state.value}
                        onCopy={() => this.setState({ copied: true })}>
                        <span class="input-group-text btn" id="basic-addon2">{this.state.copied?"Link Coppied":"Copy Link"}</span>
                    </CopyToClipboard>
                </div>
                <Link to={"/game/" + this.props.userLink}>
                    <button type="button" class="btn btn-primary btn-lg btn-block">Start Game</button>
                </Link>
            </div>
        )
    }
}

export default WaitingRoom
