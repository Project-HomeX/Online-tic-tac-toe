import React from 'react';
import './App.css';
import Game from "./components/Game"
import Entry from "./components/Entry"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WaitingRoom from "./components/WaitingRoom";
import { v4 as uuidv4 } from 'uuid';

function App() {
  // a link other user, one that has been invited, will use to join an existing game
  const userLink = uuidv4();
  return (
    <div children="App">
      <Router>
      <div style={{alignContent:"center"}}>
        
        <Route exact path="/" render={props=>(
          <Entry />
        )}/>
        <Route path="/RandomGame" component={Game}/>  {/** random game is one that where users are matched randomly from the server */}
        <Route path="/game" component={Game}/>  {/** Multiplyer game */}
        <Route path="/WaitingRoom">
          <WaitingRoom userLink={userLink} /> {/** Displayes a button and a link which will be used by socket.io */}
        </Route>
        <Route path="/LocalGame">
          <Game single={true}/>
        </Route>
      </div>
    </Router>
    </div>
    
  );
}

export default App;
