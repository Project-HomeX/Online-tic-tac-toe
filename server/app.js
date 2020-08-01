const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4000;
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);

const rooms = [];
const roomPlayer = {};
const socketRoomMap = {};

const io = socketIo(server);
let turn = true;
let numClients = 0;
io.on('connect', socket => {
    numClients++;
    console.log("Client has Joined");
    // if(users.length<2)
    //users.push(socket);
    if (true) {
        //  let otherSocket = users.find(user => user.id !== socket.id);
        // console.log("other: "+ otherSocket.id + " this:" + socket.id);
        //io.broadcast('setUp', turn);
        socket.on("sendNewMove", ({ tempVal, x, y, color, win, room, playerCount}) => {
            // otherSocket = users.find(user => user.id !== socket.id);
            console.log("Server  recived the  following values\nx: " + x + " y: " + y)
            // otherSocket.emit('changeTurn');
            // console.log("turn: "+turn)
            //socket.broadcast.emit("updateMatrix", { tempVal,x, y,color});
            socket.to(room).emit("updateMatrix", { tempVal, x, y, color, win , playerCount});
        })
        socket.on('JoinRoom', (room) => {
            if (!rooms.includes(socket.id)) {
                rooms.push(room);
                console.log("nin ja")
                socket.join(room);
                console.log("joined " + room)
            }
        })

        socket.on('findAndJoin', (room, setPlayerCount) => {
            if(socket.rooms[room]){
                console.log("This player is  alread in room " + room )
            }else if(rooms.includes(room)){
                if(roomPlayer[room] == 1){
                    socket.join(room);
                    updateRoomPlayer(room);
                    socketRoomMap[socket.id] = room;
                    setPlayerCount(2);
                    socket.to(room).emit("set-player-count", 2);
                    console.log("joined  room: " + room);
                    console.log(socket.rooms)
                }
            }else{
                rooms.push(room);
                socket.join(room);
                updateRoomPlayer(room);
                socketRoomMap[socket.id] = room;
                setPlayerCount(1);
                console.log("joined room: " + room);
                //socket.to(room).emit("increase-player");
            }
           
            // if (!rooms.includes(socket.id)) {
            //     console.log("Inside findandjoin")
            //     console.log(io.sockets.adapter.rooms[room])
            //     let r = io.sockets.adapter.rooms[room];
            //     if (r.length == 1) {
            //         socket.join(room);
            //     }
            //     console.log(io.sockets.adapter.rooms[room])
            // }


        })

        socket.on('reset', (room) => {
            socket.to(room).emit('reset');
        })

    }
    socket.on("disconnect", () => {
        numClients--;
        if(socketRoomMap[socket.id]){
            socket.to(socketRoomMap[socket.id]).emit('player-left');
        }
        roomPlayer[socketRoomMap[socket.id]]--;
        console.log(numClients, "client has left")
    })
    socket.on('disconnecting', ()=> {
        socket.emit('player-left')
    })
    console.log(numClients, socket.id)
})

function updateRoomPlayer(room){
    if(roomPlayer[room]){
        roomPlayer[room] ++;
    }else{
        roomPlayer[room] = 1;
    }
}

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