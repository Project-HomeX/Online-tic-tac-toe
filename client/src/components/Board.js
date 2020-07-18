// This is suppose to represent the whole board
import React from 'react';
import Square from './Square'
class Board extends React.Component{
    render(){
        return (
            <div>
                <Square x = "0" y = "0" matrix = {this.props.matrix} handler= {this.props.handler}/>
                <Square x = "1" y = "0" matrix = {this.props.matrix} handler=  {this.props.handler}/>
                <Square x = "2" y = "0" matrix = {this.props.matrix} handler=  {this.props.handler}/><br/>
                
                <Square x = "0" y = "1" matrix = {this.props.matrix} handler =  {this.props.handler}/>
                <Square x = "1" y = "1" matrix = {this.props.matrix} handler =  {this.props.handler}/>
                <Square x = "2" y = "1" matrix = {this.props.matrix} handler =  {this.props.handler}/><br/>
                
                <Square x = "0" y = "2" matrix = {this.props.matrix} handler =  {this.props.handler}/>
                <Square x = "1" y = "2" matrix = {this.props.matrix} handler =  {this.props.handler}/>
                <Square x = "2" y = "2"matrix = {this.props.matrix} handler =  {this.props.handler}/>
            </div>
        )
    }
}

export default Board;