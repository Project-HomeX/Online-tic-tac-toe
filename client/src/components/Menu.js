// This component is supposed to represent each squares
import React from 'react';
import Button from 'react-bootstrap/Button'



class Menu extends React.Component {

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.props.removeText}>Restart</Button> <br />
                <button onClick={this.props.handleJoin}> Join</button>
                <input type="text" onChange = {this.props.handleJoinId}/> <br />
                <button onClick={this.props.generateHandle}> Generate</button>
                <input readOnly value={this.props.gameId} type="text" max="6" />

            </div>

        )
    }
}

export default Menu;
