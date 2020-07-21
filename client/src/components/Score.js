import React from 'react';

class Score extends React.Component{
    render(){
        return (
            <div>
             <h1>Score</h1>
             <div>
                 <div className='white'>
                     <p>white: 1/3</p>
                 </div>
                 <div className='black'>
                     <p>black: 2/3</p>
                 </div>
             </div>
             </div>
        )
    }
}

export default Score;
