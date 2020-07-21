// This component is supposed to represent each squares
import React from 'react';
import Button from 'react-bootstrap/Button'
class Menu extends React.Component {
    render() {
        return (
            <div> 
                <Button variant="primary" onClick = {this.props.removeText}>Restart</Button> <br/>
                <button> Join</button>
                <input type="text" /> <br/>
                <button> Generate</button> 
                <input type="text" max="6"/>
                
            </div>
            
        )
    }
}

export default Menu;
