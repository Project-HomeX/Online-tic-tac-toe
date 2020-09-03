import React from 'react';

import Sketch from "react-p5";
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let flag = true;
let x;
let y;
let win;
let turn = true;
let W = 400;
let H = 400;

let isResized = false;

function TicSinglPlayerF(props) {

  const setup = (p5, canvasParentRef) => {
    W = p5.windowWidth*0.5;
    H = p5.windowHeight*0.5;

    // let k = W<H?W:H;
    W = H = W<H?W:H
    p5.createCanvas(W, H).parent(canvasParentRef);
    update(p5);
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
          if(matrix[i][j] === -1){
            colorBoxes(p5,i,j,"red");
            drawO(p5,i,j,'red');
            
          }
          else if(matrix[i][j] === 1){
            colorBoxes(p5,i,j,"blue");
            drawX(p5,i,j,'blue');
          }
        }
      }
    }
  }

  // here color box is a helper func to draw Os and Xs based on size.
  // it does not color any boxes since single player is done using Xs and Os not rectangles. 
  function colorBoxes(p5, x, y,c) {
    if(isResized){
      p5.fill(c);
    }
    else{
      let color = (flag) ? "blue" : "red";
      (color==='blue')?drawX(p5,x,y,"white"):drawO(p5,x,y,"white");
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
   // let pf = x * 0.2;
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
    console.log("turn:  " + turn)
    if (true) {
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
          flag = !flag;
         matrix[px][py] = tempVal;

          turn = false;
          addToSum(px, py, tempVal);
          logic(p5, true)
          colorBoxes(p5, px, py)
        }
      }
    }
  };
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
    padding: "5em",
  }} setup={setup} windowResized={windowResized} draw={draw} mouseClicked={mouseClicked} />);
};


export default TicSinglPlayerF;