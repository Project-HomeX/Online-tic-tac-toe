import React from 'react';

class Score extends React.Component {
    render() {
        return (
            <div>
                <h3> {this.props.text} </h3>
                <h1>Score</h1>
                <div>
                    <div className='white'>
                        <p>
                            white: {this.props.player1Score}/
                            {this.props.totalGamePlayed}
                        </p>
                    </div>
                    <div className='black'>
                        <p>black: {this.props.player2Score}/
                            {this.props.totalGamePlayed}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Score;
