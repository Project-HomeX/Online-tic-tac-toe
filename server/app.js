const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4000;
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);
let turn = true;
let numClients = 0;
io.on('connect', socket => {
    numClients ++; 
    
    console.log("Client has Joined");
    //io.broadcast('setUp', turn);
    socket.on("sendNewMove", ({x,y}) => {
        console.log("Server recived the following values\nx: " + x + " y: " + y)
        turn != turn;
        io.emit("updateMatrix", {x, y, turn});
    })
    socket.on("disconnect", () => {
        numClients --;
        console.log(numClients,"client has left")
    })
    console.log(numClients, socket.id)
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));