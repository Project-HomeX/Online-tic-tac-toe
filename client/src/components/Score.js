import React from 'react';

class Score extends React.Component {
    render() {
        let You = "You";
        let Opponent = "Opponent"

        if(this.props.single){
            You = "Red";
            Opponent="Blue"
        }
        return (
            <div>
                <h3> {this.props.text} </h3>
                <h1>Score</h1>
                <div>
                    <div className='you'>
                        <p>
                            {You}: {this.props.player1Score}/
                            {this.props.totalGamePlayed}
                        </p>
                    </div>
                    <div className='other'>
                        <p>
                            {Opponent}: {this.props.player2Score}/
                            {this.props.totalGamePlayed}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Score;
