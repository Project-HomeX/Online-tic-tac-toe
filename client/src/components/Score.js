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
                        <h3>
                            {You}: {this.props.player1Score}:
                            {this.props.totalGamePlayed}
                        </h3>
                    </div>
                    <div className='other'>
                        <h3>
                            {Opponent}: {this.props.player2Score}:
                            {this.props.totalGamePlayed}
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Score;
