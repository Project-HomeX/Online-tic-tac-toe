
// This component is supposed to represent each squares
import React from 'react';

class Sqare extends React.Component {
    render() {

        return (
            <button style={{ height: "100px", width: "100px" }} name={this.props.x + "," + this.props.y} onClick={this.props.handler}> {this.props.matrix}</button>
        )
    }
}

export default Sqare;