
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
// import logo from './logo.svg';
// import './App.css';

import Sketch from "react-p5";
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let flag = true;
let color = 'red'
let x;
let y;
let win;
let ENDPOINT = "http://127.0.0.1:4000";
let socket;
let globalP5;
let turn = true;
let numberOfPlayersConnected = 0;
let width = 600;
let height = 600;
function Tic(props) {
  useEffect(() => {
    console.log(window.location.pathname)
    socket = socketIOClient(ENDPOINT);
    props.setRoomId(window.location.pathname);
    //this will be only called by the second person joining
    socket.on('setRoomId', (room) => {
      props.setRoomId(room);
    })
    socket.on("set-player-count", (count) => {
      console.log("set-player-count")
      numberOfPlayersConnected = count;
      props.setPlayerCount(count);
    })
    socket.on("player-left", () => {
      props.setPlayerCount(1);
      numberOfPlayersConnected = 1;
      update(globalP5);
    })
    //Don't want to play game until we have 2 players
    socket.on('updateMatrix', (e) => {
      console.log("trying to update matrix");
    })

    socket.on("updateMatrix", ({ tempVal, x, y, color, swin, playerCount }) => {
      console.log("inside update matrix")
      //numberOfPlayersConnected = playerCount;
      //props.setPlayerCount(playerCount)
      console.log("props:  " + props.playerCount + " from socket: " + playerCount);
      if (numberOfPlayersConnected == 2) {
        // console.log("player  count: " + props.playerCount)
        matrix[x][y] = tempVal;
        // console.log('after  matrix  update: ' + turn + ' ' + color)
        colorBoxes(globalP5, x, y, color);
        win = swin;
        turn = true;
        // console.log("matrix after apdate: ")
        // console.log(matrix)
        addToSum(x, y, tempVal)
        logic(globalP5, false);
        // color = 'red';
        console.log("Recived values\n X: " + x + " Y: " + y);
      }
    });

    socket.on('reset', () => {
      update(globalP5);
    })


  }, []);

  // const [sum, setSum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  //const [matrix, setMatrix] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
  //const [flag, setFlag] = useState(true);
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(width, height).parent(canvasParentRef);
    update(p5);
    globalP5 = p5;
  };
  const draw = (p5) => {
    if (props.isClicked) {
      if (props.playerCount == 2) socket.emit('reset', props.roomId);
      update(p5);
      props.falseIsClicked();
    }
    if (props.isJoiner) {
      socket.emit('findAndJoin', props.roomId, props.setPlayerCount);
      // console.log(socket)
      // console.log("Button join is being clicked! ")
      props.falseIsJoiner();
    }
  }
  function update(p5) {
    sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    matrix = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
    flag = true;
    win = false;
    turn = true;
    color = 'red'
    p5.background(0);
    p5.stroke(255);
    p5.strokeWeight(10);
    
    // horizontal 
    p5.line(0, 200, 600, 200);
    p5.line(0, 400, 600, 400);

    // vertical 
    p5.line(200, 0, 200, 600);
    p5.line(400, 0, 400, 600);
  }
  function colorBoxes(p5, x, y, c) {
    // console.log(c);
    // let color = (flag) ? "blue" : "red";
    p5.fill(c);
    p5.rect(x * 200, y * 200, 200, 200);

    // change

    if (c === 'red') {
      color = 'blue';
    }
    if (c === 'blue') {
      color = 'red';
    }
    // logic(p5);
    // console.log(color)
    // console.log(matrix)
  }
  const mouseClicked = (p5) => {
    console.log("number of players" + numberOfPlayersConnected)
    if (turn && numberOfPlayersConnected == 2) {
      console.log("player   count: " + props.playerCount)
      // setTurn(false)
      x = p5.mouseX;
      y = p5.mouseY;
      if (x < 600 && y < 600 && !win && x > 0 && y > 0) {
        let px = p5.floor(x / 200);
        let py = p5.floor(y / 200);
        let tempVal = -1;
        if (matrix[px][py] === 0) {
          /* if (flag) {
             tempVal = -1;
           } else {
             tempVal = 1; 
           }*/
          if (color == 'red') {
            tempVal = -1;
          } else {
            tempVal = 1;
          }
          flag = !flag;
          matrix[px][py] = tempVal;

          turn = false;
          // color = 'blue';
          addToSum(px, py, tempVal);
          logic(p5, true)
          socket.emit("sendNewMove", ({ tempVal, x: px, y: py, color, win, room: props.roomId, playerCount: props.playerCount }));
          colorBoxes(p5, px, py, color)
        }
      }
    }
  };

  //[v1,v2,v3,h1,h2,h3,d1,d1]
  function addToSum(x, y, v) {
    if (x === 0 && y === 0) {
      sum[0] += v;
      sum[3] += v;
      sum[7] += v;
    } else if (x === 0 && y === 1) {
      sum[0] += v;
      sum[4] += v;
    } else if (x === 0 && y === 2) {
      sum[0] += v;
      sum[5] += v;
      sum[6] += v;
    } else if (x === 1 && y === 0) {
      sum[1] += v;
      sum[3] += v;
    } else if (x === 1 && y === 1) {
      sum[1] += v;
      sum[4] += v;
      sum[6] += v;
      sum[7] += v;
    } else if (x === 1 && y === 2) {
      sum[1] += v;
      sum[5] += v;
    } else if (x === 2 && y === 0) {
      sum[2] += v;
      sum[3] += v;
      sum[6] += v;
    } else if (x === 2 && y === 1) {
      sum[2] += v;
      sum[4] += v;
    } else if (x === 2 && y === 2) {
      sum[2] += v;
      sum[5] += v;
      sum[7] += v;
    }
  }

  function logic(p5, didWin) {
    for (let x = 0; x < 8; x++) {
      if (sum[x] === -3 || sum[x] === 3) {
        didWin ? props.updateScore(1, 0, didWin) : props.updateScore(0, 1, didWin);
        win = true;
        console.log("updating scor e after win - true :")
        console.log(matrix)
      }
    }
  }
  /*
    const draw = (p5) => {
      p5.ellipse(x, y, 70, 70);
      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes
      x++;
    };
    */

  return (<Sketch style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  }} setup={setup} draw={draw} mouseClicked={mouseClicked} />);
};


export default Tic;