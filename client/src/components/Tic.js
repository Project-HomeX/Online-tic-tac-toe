
import React, { useEffect } from 'react';
import socketIOClient from "socket.io-client";

/**
 * Multiplyer Tic-tac-toe using p5 library
 * This is where the game logic is taken care of.
 */
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
let W = 400;
let H = 400;
let isResized = false;
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
     // console.log("set-player-count")
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
      // swin let as know the other players move has won the game.
      if (numberOfPlayersConnected === 2) {
        matrix[x][y] = tempVal;
        colorBoxes(globalP5, x, y, color);
        win = swin;
        turn = true;
        addToSum(x, y, tempVal)
        logic(globalP5, false);
        console.log("Recived values\n X: " + x + " Y: " + y);
      }
    });

    socket.on('reset', () => {
      update(globalP5);
    })
  }, []);

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    W = p5.windowWidth*0.5;
    H = p5.windowHeight*0.5;
    W = H = W<H?W:H
    p5.createCanvas(W, H).parent(canvasParentRef);
    update(p5);
    globalP5 = p5;
  } = (p5) => {
    W = p5.windowWidth*0.5;
    H = p5.windowHeight*0.5;
    W = H = W<H?W:H
    p5.resizeCanvas(W, H);

    isResized = true;
  }
  const draw = (p5) => {
    // TODO for Abrham
    // can you say what isClicked referes to.
    // I assume its restart?
    if (props.isClicked) {
      if (props.playerCount === 2) socket.emit('reset', props.roomId);
      update(p5);
      props.falseIsClicked();
    }
    if(isResized){
      update(p5);
      isResized = false;
    }
    if (props.isJoiner) {
      socket.emit('findAndJoin', props.roomId, props.setPlayerCount);
      props.falseIsJoiner();
    }
  }
  function update(p5) {
    if(!isResized){
      sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      matrix = [[0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]];
      flag = true;
      win = false;
      turn = true;
      color = 'red'
    }
    
    p5.background(0);
    p5.stroke('#00cc96');
    p5.strokeWeight(10);
    // horizontal 
    p5.line(0, H/3, W, H/3);
    p5.line(0, 2*H/3, W, 2*H/3);

    // vertical 
    p5.line(W/3, 0, W/3, H);
    p5.line(2*W/3, 0, 2*W/3, H);
    
    // Need to be tested
    if(isResized){
      for(let i = 0; i<matrix.length; i++){
        for(let j = 0; j<matrix.length; j++){
          if(matrix[i][j] == -1){
            colorBoxes(p5,i,j,"red");
            drawO(p5,i,j,'red');
            
          }
          else if(matrix[i][j] == 1){
            colorBoxes(p5,i,j,"blue");
            drawX(p5,i,j,'blue');
          }
        }
      }
    }

  }
  function colorBoxes(p5, x, y, c) {

   // p5.fill(c);
   // p5.rect(x * 200, y * 200, 200, 200);
    if(isResized){
      p5.fill(c);
    }else{
      (color=='blue')?drawX(p5,x,y,"white"):drawO(p5,x,y,"white");
    }

    // change the color to be drawn based on whose turn it is.
    if (c === 'red') {
      color = 'blue';
    }
    if (c === 'blue') {
      color = 'red';
    }
  }
  function drawX(p5,x,y,c){
    c = 'white';
    let pf = (W/3)*0.2;

    let topL = {x,y}
    topL.x = (x*W/3)+pf;
    topL.y = y * H/3+pf;
    let bottomR = {x,y} 
    bottomR.x = (x*W/3)+W/3-pf;
    bottomR.y = (y*H/3)+H/3-pf;
    let topR = {x,y}
    topR.x = x * W/3 + W/3-pf;
    topR.y = y * H/3+pf;
    let bottomL = {x,y}
    bottomL.x = (x * W/3)+pf;
    bottomL.y = (y*H/3)+H/3-pf;
    p5.stroke(c);
    p5.strokeWeight(10);
    p5.line(topL.x,topL.y,bottomR.x,bottomR.y);
    p5.line(topR.x,topR.y,bottomL.x,bottomL.y);
  }
  function drawO(p5,x,y,c){
    c = "white";
    let pf = x * 0.2;
    p5.fill('black')
    p5.stroke(c);
    p5.strokeWeight(10);
    let edgeX = x * W/3;
    let edgeY = y * H/3;
    let mid = (W/3) - (W/3)/2;
    let centerX = edgeX+mid;
    let centerY = edgeY+mid;
    p5.ellipse(centerX, centerY,mid*2*0.8);
  }
  const mouseClicked = (p5) => {
    console.log("number of players" + numberOfPlayersConnected)
    if (turn && numberOfPlayersConnected === 2) {
      console.log("player   count: " + props.playerCount)
      x = p5.mouseX;
      y = p5.mouseY;
      if (x < W && y < H && !win && x > 0 && y > 0) {
        let px = p5.floor(x / (W/3));
        let py = p5.floor(y / (H/3));
        let tempVal = -1;
        if (matrix[px][py] === 0) {
          if (color === 'red') {
            tempVal = -1;
          } else {
            tempVal = 1;
          }
          flag = !flag;
          matrix[px][py] = tempVal;

          turn = false;
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

  return (<Sketch style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  }} setup={setup} windowResized={windowResized} draw={draw} mouseClicked={mouseClicked} />);
};


export default Tic;