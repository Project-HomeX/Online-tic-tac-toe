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
        let otherSocket = users.find(user => user.id !== socket.id);
        console.log("other: "+ otherSocket.id + " this:" + socket.id);
        console.log("Client has Joined");
        //io.broadcast('setUp', turn);
        socket.on("sendNewMove", ({ tempVal,x, y,color,win}) => {
            otherSocket = users.find(user => user.id !== socket.id);
            console.log("Server recived the following values\nx: " + x + " y: " + y)
            // otherSocket.emit('changeTurn');
            // console.log("turn: "+turn)
            //socket.broadcast.emit("updateMatrix", { tempVal,x, y,color});
            socket.broadcast.emit("updateMatrix", { tempVal,x, y,color,win});

        })

    }
    socket.on("disconnect", () => {
        numClients--;
        console.log(numClients, "client has left")
    })
    console.log(numClients, socket.id)
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));