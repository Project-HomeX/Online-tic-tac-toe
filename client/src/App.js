import React from 'react';
import './App.css';
import Game from "./components/Game"
import Entry from "./components/Entry"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WaitingRoom from "./components/WaitingRoom";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const userLink = uuidv4();
  return (
    <Router>
      <div style={{alignContent:"center"}}>
        
        <Route exact path="/" render={props=>(
          <Entry />
        )}/>
        <Route path="/RandomGame" component={Game}/>
        <Route path="/game" component={Game}/>
        <Route path="/WaitingRoom">
          <WaitingRoom userLink={userLink} />
        </Route>
        <Route path="/LocalGame">
          <Game single={true}/>
        </Route>
      </div>
    </Router>
  );
}

export default App;
