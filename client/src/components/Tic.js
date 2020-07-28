
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
// import logo from './logo.svg';
// import './App.css';

import Sketch from "react-p5";
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let matrix = [[0, 0, 0],
[0, 0, 0],
[0, 0, 0]];
let flag = true;
let turn = true;
let x;
let y;
let win;
function Tic(props) {
  let ENDPOINT = "http://127.0.0.1:4000";
  let socket;
  let globalP5;
  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("updateMatrix", ({ x, y , flag}) => {
      turn = flag;
      colorBoxes(globalP5, x, y);
      console.log("Recived values\n X: " + x + " Y: " + y);
    });
  }, []);
  // const [sum, setSum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  //const [matrix, setMatrix] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
  //const [flag, setFlag] = useState(true);
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(600, 600).parent(canvasParentRef);
    update(p5);
    globalP5 = p5;
  };
  const draw = (p5) => {
    if (props.isClicked) {
      update(p5);
      props.falseIsClicked();
    }
  }
  function update(p5) {
    sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    matrix = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
    flag = true;
    win = false;
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
  function colorBoxes(p5, x, y) {
    let color = (flag) ? "blue" : "red";
    p5.fill(color);
    p5.rect(x * 200, y * 200, 200, 200);
  }
  const mouseClicked = (p5) => {
    if (true) {
      x = p5.mouseX;
      y = p5.mouseY;
      if (x < 600 && y < 600 && !win && x > 0 && y > 0) {
        let px = p5.floor(x / 200);
        let py = p5.floor(y / 200);
        let tempVal = -1;
        if (matrix[px][py] === 0) {
          socket.emit("sendNewMove", ({ x: py, y: py }));
          if (flag) {
            tempVal = -1;
          } else {
            tempVal = 1;
          }
          flag = !flag;
          matrix[px][py] = tempVal;
          colorBoxes(p5, px, py)
          addToSum(px, py, tempVal);
          logic(p5)
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

  function logic(p5) {
    for (let x = 0; x < 8; x++) {
      if (sum[x] === -3 || sum[x] === 3) {
        if (sum[x] == -3) {
          props.updateScore(1, 0);
        } else {
          props.updateScore(0, 1);
        }
        win = true;
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