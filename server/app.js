const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
 
const PORT = process.env.PORT || 4000;
const index = require("./index");
 
const app = express();
app.use(index);
 
const server = http.createServer(app);
 
const users = [];
 
const io = socketIo(server);
let turn = true;
let numClients = 0;
io.on('connect', socket => {
    numClients++;
    // if(users.length<2)
        users.push(socket);
    if (users.length >= 2) {
       // let otherSocket = users.find(user => user.id !== socket.id);
       // console.log("other: "+ otherSocket.id + " this:" + socket.id);
        console.log("Client has Joined");
        //io.broadcast('setUp', turn);
        socket.on("sendNewMove", ({ tempVal,x, y,color,turn}) => {
            otherSocket = users.find(user => user.id !== socket.id);
            console.log("Server recived the following values\nx: " + x + " y: " + y)
            // otherSocket.emit('changeTurn');
            console.log("turn: "+turn)
            //socket.broadcast.emit("updateMatrix", { tempVal,x, y,color});
            socket.broadcast.emit("updateMatrix", { tempVal,x, y,color,turn});
 
        })
 
    }
    socket.on("disconnect", () => {
        numClients--;
        console.log(numClients, "client has left")
    })
    console.log(numClients, socket.id)
})
 
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));





// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const PORT = process.env.PORT || 4000;
// const index = require("./index");

// const app = express();
// app.use(index);

// const server = http.createServer(app);

// const io = socketIo(server);
// let numClients = 0;
// io.on('connect', socket => {
//     numClients ++; 
//     socket.join("room");
//     // if(numClients == 1){
//     //     socket.emit("color", "blue");
//     // }else{
//     //     socket.emit("color", "red"); 
//     // }
//     console.log("Client has Joined");
    
//     socket.on("sendNewMove", ({x,y}) => {
//         console.log("Server recived the following values\nx: " + x + " y: " + y)
//         socket.broadcast.to("room").emit("updateMatrix", {x, y});
//         socket.broadcast.to("room").emit('changeTurn');
//     })
//     socket.on("disconnect", () => { 
//         numClients --;
//         console.log(numClients,"client has left")
//     })

//     socket.on("win", () => {
//         io.emit("updateWinStatus");
//     })

    
//     console.log(numClients, socket.id)
// })

// server.listen(PORT, () => console.log(`Listening on port ${PORT}`));