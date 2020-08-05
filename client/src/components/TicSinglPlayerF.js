
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
let globalP5;
let turn = true;
let W = 400;
let H = 400;

let isResized = false;

function TicSinglPlayerF(props) {

    //Don't want to play game until we have 2 players


  // const [sum, setSum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  //const [matrix, setMatrix] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
  //const [flag, setFlag] = useState(true);
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    W = p5.windowWidth*0.5;
    H = p5.windowHeight*0.5;

    // let k = W<H?W:H;
    W = H = W<H?W:H
    p5.createCanvas(W, H).parent(canvasParentRef);
    update(p5);
    globalP5 = p5;
  };

  const windowResized = (p5) => {
    W = p5.windowWidth*0.5;
    H = p5.windowHeight*0.5;
    W = H = W<H?W:H
    p5.resizeCanvas(W, H);

    isResized = true;
  }
  const draw = (p5) => {
    if (props.isClicked) {
      update(p5);
      props.falseIsClicked();
    }
    if(isResized){
      update(p5);
      isResized = false;
    }
    // if(props.isGenerator){
    //   console.log("Befor e JoinRoom " + socket.id)
    //   props.genId(socket.id);
    //   props.falseIsGenerator();
    //   console.log(socket)
    //   socket.emit('JoinRoom', socket.id);
    //   console.log("Af te  r  Jo in Room " + socket.id)
    // }  
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

    // color each box
    if(isResized){
      for(let i = 0; i<matrix.length; i++){
        for(let j = 0; j<matrix.length; j++){
          if(matrix[i][j] == -1){
            colorBoxes(p5,i,j,"red");
          }
          else if(matrix[i][j] == 1){
            colorBoxes(p5,i,j,"blue");
          }
        }
      }
    }
  }
  function colorBoxes(p5, x, y,c) {

    if(isResized){
      p5.fill(c);

    }
    else{
      let color = (flag) ? "blue" : "red";
      p5.fill(color);
    }
    // console.log(c);
    p5.rect(x * W/3, y * H/3, W/3, H/3);

    // change

    // if (c === 'red') {
    //   color = 'blue';
    // }
    // if (c === 'blue') {
    //   color = 'red';
    // }
    // // logic(p5);
    // console.log(color)
    // console.log(matrix)
  }
  
  const mouseClicked = (p5) => {
    console.log("turn:  " + turn)
    if (true) {
     // console.log("player  count: " + props.playerCount)
      // setTurn(false)
      x = p5.mouseX;
      y = p5.mouseY;
      console.log("win line 94 "+win)
      if (x < W && y < H && !win && x > 0 && y > 0) {
        let px = p5.floor(x / (W/3));
        let py = p5.floor(y / (H/3));
        let tempVal = -1;
        if (matrix[px][py] === 0) {
          if (flag) {
             tempVal = -1;
           } else {
             tempVal = 1; 
           }
        //   if (color == 'red') {
        //     tempVal = -1;
        //   } else {
        //     tempVal = 1;
        //   }
          flag = !flag;
         matrix[px][py] = tempVal;

          turn = false;
          // color = 'blue';
          addToSum(px, py, tempVal);
          logic(p5, true)
          colorBoxes(p5, px, py)
        }
      }
    }
  };
  // end

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
          if(sum[x] ===-3){
            props.updateScore(1, 0)
          }else{
            props.updateScore(0, 1)
          }
      // didWin ? props.updateScore(1, 0, didWin) : props.updateScore(0, 1, didWin);
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
    padding: "5em",
    // backgroundColor: '#00cc96'
  }} setup={setup} windowResized={windowResized} draw={draw} mouseClicked={mouseClicked} />);
};


export default TicSinglPlayerF;