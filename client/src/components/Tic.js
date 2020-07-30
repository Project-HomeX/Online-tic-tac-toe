<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
// import logo from './logo.svg';
// import './App.css';

import Sketch from "react-p5";
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let matrix = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
let flag = true;
let color = 'blue'
let x;
let y;
let win;

function Tic(props) {
  let ENDPOINT = "http://127.0.0.1:4000";
  let socket;
  let globalP5;
  let turn = true;
  // let [turn, setTurn] = useState(true)

  // let [color, setColor] = useState('red');
  
  useEffect(() => {
   socket = socketIOClient(ENDPOINT);
   /* socket.on('changeTurn', () => {
      console.log("Changing turn to true")
      // setTurn(true)
      turn = true;
    })*/
    socket.on("updateMatrix", ({tempVal, x, y,color}) => {
      matrix[x][y] = tempVal;
     
      console.log('after matrix update: '+turn + ' '+color)
      colorBoxes(globalP5, x, y,color);
      turn = true;
      //color = 'red';
      console.log("Recived values\n X: " + x + " Y: " + y);
    });
  }, [ENDPOINT]);
  
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
  function colorBoxes(p5, x, y,c) {
    console.log(c);
    // let color = (flag) ? "blue" : "red";
    p5.fill(c);
    p5.rect(x * 200, y * 200, 200, 200);
    
    // change
    
    if(c === 'red') {
      color = 'blue';
    }
    if(c === 'blue'){
      color = 'red';
    }
    
    console.log(color)
    console.log(matrix)
  }
  const mouseClicked = (p5) => {
    console.log(turn)
    if (turn) {
      // setTurn(false)
      x = p5.mouseX;
      y = p5.mouseY;
      if (x < 600 && y < 600 && !win && x > 0 && y > 0) {
        let px = p5.floor(x / 200);
        let py = p5.floor(y / 200);
        let tempVal = -1;
        if (matrix[px][py] === 0) { 
          if (flag) {
            tempVal = -1;
          } else {
            tempVal = 1;
          }
          flag = !flag;
          matrix[px][py] = tempVal;
          socket.emit("sendNewMove", ({tempVal, x: px, y: py, color,turn}));
          turn = false;
          //color = 'blue';
          colorBoxes(p5, px, py,color)
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









// import React, { useState, useEffect } from 'react';
// import socketIOClient from "socket.io-client";
// import Sketch from "react-p5";
// let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// let matrix = [[0, 0, 0],
// [0, 0, 0],
// [0, 0, 0]];
// let flag = true;
// let turn = true;
// let color = "blue"
// let x;
// let y;
// let win;
// let tempVal = 1;
// function Tic(props) {
//   let ENDPOINT = "http://127.0.0.1:4000";
//   let socket;
//   let globalP5;
//   useEffect(() => {
//     //socket connecting to server
//     socket = socketIOClient(ENDPOINT);
//     //updating this player's board based on the other player
//     socket.on("updateMatrix", ({ x, y}) => {
//       color = color == "blue" ? "red" : "blue"
//       temp(globalP5, x, y);
//       colorBoxes(globalP5, x, y)
//       console.log("Recived values\n X: " + x + " Y: " + y);
//     });
//     socket.on("updateWinStatus", () => {
//       win = true;
//     })
//     socket.on("changeTurn", () => {
//       console.log("Changing turns!")
//       tempVal = 1;
//       turn = true;
//     })
//   }, []);
//   // const [sum, setSum] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
//   //const [matrix, setMatrix] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
//   //const [flag, setFlag] = useState(true);
//   const setup = (p5, canvasParentRef) => {
//     // use parent to render the canvas in this ref
//     // (without that p5 will render the canvas outside of your component)
//     p5.createCanvas(600, 600).parent(canvasParentRef);
//     update(p5);
//     globalP5 = p5;
//   };
//   const draw = (p5) => {
//     if (props.isClicked) {
//       update(p5);
//       props.falseIsClicked();
//     }
//   }
//   function update(p5) {
//     sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//     matrix = [[0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]];
//     flag = true;
//     win = false;
//     p5.background(0);
//     p5.stroke(255);
//     p5.strokeWeight(10);
//     // horizontal 
//     p5.line(0, 200, 600, 200);
//     p5.line(0, 400, 600, 400);

//     // vertical 
//     p5.line(200, 0, 200, 600);
//     p5.line(400, 0, 400, 600);
//   }
//   function colorBoxes(p5, x, y) {
//     console.log(matrix)
//     p5.fill(color);
//     p5.rect(x * 200, y * 200, 200, 200);
//   }
//   function temp(p5, x, y, fromHere) {
//     if (true) {
//       if (x < 600 && y < 600 && !win && x > 0 && y > 0) {
//         let px = p5.floor(x / 200);
//         let py = p5.floor(y / 200);
//         //let tempVal = -1;
//         if (matrix[px][py] === 0) {
//           if(turn) socket.emit("sendNewMove", ({ x: px, y: py }));
//           console.log("sending values\nx: " + px + " y: " + py)
//           color = color == "blue" ? "red" : "blue"
//           turn = false;
//           tempVal = -1;
//           flag = !flag;
//           matrix[px][py] = tempVal;
//           colorBoxes(p5, px, py)
//           addToSum(px, py, tempVal);
//           logic(p5)
//         }
//       }
//     }
//   }
//   const mouseClicked = (p5) => {
//     if (turn) {
//       x = p5.mouseX;
//       y = p5.mouseY;
//       temp(p5, x, y, true);
//     }
//   };

//   //[v1,v2,v3,h1,h2,h3,d1,d1]
//   function addToSum(x, y, v) {
//     if (x === 0 && y === 0) {
//       sum[0] += v;
//       sum[3] += v;
//       sum[7] += v;
//     } else if (x === 0 && y === 1) {
//       sum[0] += v;
//       sum[4] += v;
//     } else if (x === 0 && y === 2) {
//       sum[0] += v;
//       sum[5] += v;
//       sum[6] += v;
//     } else if (x === 1 && y === 0) {
//       sum[1] += v;
//       sum[3] += v;
//     } else if (x === 1 && y === 1) {
//       sum[1] += v;
//       sum[4] += v;
//       sum[6] += v;
//       sum[7] += v;
//     } else if (x === 1 && y === 2) {
//       sum[1] += v;
//       sum[5] += v;
//     } else if (x === 2 && y === 0) {
//       sum[2] += v;
//       sum[3] += v;
//       sum[6] += v;
//     } else if (x === 2 && y === 1) {
//       sum[2] += v;
//       sum[4] += v;
//     } else if (x === 2 && y === 2) {
//       sum[2] += v;
//       sum[5] += v;
//       sum[7] += v;
//     }
//   }

//   function logic(p5) {
//     for (let x = 0; x < 8; x++) {
//       if (sum[x] === -3 || sum[x] === 3) {
//         if (sum[x] == -3) {
//           props.updateScore(1, 0);
//         } else {
//           props.updateScore(0, 1);
//         }
//         socket.emit("win");
//         win = true;
//       }
//     }
//   }

//   return (<Sketch style={{
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "10px",
//   }} setup={setup} draw={draw} mouseClicked={mouseClicked} />);
// };
// export default Tic;
=======

import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
// import logo from './logo.svg';
// import './App.css';

import Sketch from "react-p5";
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let matrix = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
let flag = true;
let color = 'red'
let x;
let y;
let win;
function Tic(props) {
  let ENDPOINT = "http://127.0.0.1:4000";
  let socket;
  let globalP5;
  let turn = true;
  // let [turn, setTurn] = useState(true)

  // let [color, setColor] = useState('red');
  
  useEffect(() => {
   socket = socketIOClient(ENDPOINT);
   /* socket.on('changeTurn', () => {
      console.log("Changing turn to true")
      // setTurn(true)
      turn = true;
    })*/
    socket.on("updateMatrix", ({tempVal, x, y,color,swin}) => {
      matrix[x][y] = tempVal;
      
      console.log('after matrix update: '+turn + ' '+color)
      colorBoxes(globalP5, x, y,color);
      win = swin;
      turn = true;
      console.log("matrix after apdate: ")
      console.log(matrix)
      addToSum(x, y, tempVal)
      logic(globalP5);
      // color = 'red';
      console.log("Recived values\n X: " + x + " Y: " + y);
    });
  }, [ENDPOINT]);
  
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
  function colorBoxes(p5, x, y,c) {
    console.log(c);
    // let color = (flag) ? "blue" : "red";
    p5.fill(c);
    p5.rect(x * 200, y * 200, 200, 200);
    
    // change
    
    if(c === 'red') {
      color = 'blue';
    }
    if(c === 'blue'){
      color = 'red';
    }
    // logic(p5);
    console.log(color)
    console.log(matrix)
  }
  const mouseClicked = (p5) => {
    console.log(turn)
    if (turn) {
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
          logic(p5)
          socket.emit("sendNewMove", ({tempVal, x: px, y: py, color,win}));
          colorBoxes(p5, px, py,color)
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
        console.log("updating score after win - true :" )
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
>>>>>>> 9b8bf53a56511dd53e0fee7e7d7352f4fef0b288
