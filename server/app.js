const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4000;
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);

const rooms = [];
const RemotePlayersRoom = {};
const RandomPlayersRoom = {};
const RandomPlayers = [];
const socketRoomMap = {};
const currentRandomPlayers = [];

const io = socketIo(server);
let turn = true;
let numClients = 0;
io.on('connect', socket => {
    numClients++;
    console.log("Client has Joined");
    // if(users.length<2)
    //users.push(socket);
    if (true) {
        socket.on("sendNewMove", ({ tempVal, x, y, color, win, room, playerCount }) => {
            console.log("Server  recived the  following values\nx: " + x + " y: " + y)
            console.log('room: ' + room)
            socket.to(room).emit("updateMatrix", { tempVal, x, y, color, win, playerCount });
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
            let roomType = getRoomType(room);
            if (roomType == 'game') {
                if (socket.rooms[room]) {
                    console.log("This player is  alread in room " + room)
                } else if (rooms.includes(room)) {
                    if (RemotePlayersRoom[room] == 1) {
                        socket.join(room);
                        updateRoomPlayer(room);
                        socketRoomMap[socket.id] = room;
                        setPlayerCount(2);
                        socket.to(room).emit("set-player-count", 2);
                        socket.emit('set-player-count', 2);
                        console.log("joined  room: " + room);
                        console.log(socket.rooms)
                    }
                } else {
                    rooms.push(room);
                    socket.join(room);
                    updateRoomPlayer(room);
                    socketRoomMap[socket.id] = room;
                    socket.emit("set-player-count", 1)
                    setPlayerCount(1);
                    console.log("joined room: " + room);
                    //socket.to(room).emit("increase-player");
                }
            } else if (roomType == 'RandomGame') {
                let l = RandomPlayers.length;
                console.log(RandomPlayers)
                if (l > 0) {
                    let match = RandomPlayers.pop();
                    socket.join(match);
                    socket.emit('setRoomId', match);
                    socketRoomMap[socket.id] = match;
                    RandomPlayersRoom[match].push(socket.id);
                    socket.to(match).emit("set-player-count", 2);
                    socket.emit('set-player-count', 2);
                    setPlayerCount(2);
                } else {
                    socket.emit("set-player-count", 1);
                    setPlayerCount(1);
                    socket.emit('setRoomId', '/RandomGame/' + socket.id);
                    socket.join('/RandomGame/' + socket.id);
                    RandomPlayers.push('/RandomGame/' + socket.id);
                    socketRoomMap[socket.id] = '/RandomGame/' + socket.id;
                    RandomPlayersRoom['/RandomGame/' + socket.id] = [socket.id];
                }
            }
        })

        socket.on('reset', (room) => {
            socket.to(room).emit('reset');
        })

    }
    socket.on("disconnect", () => {
        numClients--;
        let room = socketRoomMap[socket.id];
        if (room) {
            let roomType = getRoomType(room);
            if (roomType == 'game') {
                if (socketRoomMap[socket.id]) {
                    socket.to(socketRoomMap[socket.id]).emit('player-left');
                }
                if (RemotePlayersRoom[socketRoomMap[socket.id]] == 1) {
                    delete RemotePlayersRoom[socketRoomMap[socket.id]];
                    const index = rooms.indexOf(socketRoomMap[socket.id]);
                    if (index > -1) {
                        rooms.splice(index, 1);
                    }
                } else {
                    RemotePlayersRoom[socketRoomMap[socket.id]]--;
                }
            } else if (roomType == 'RandomGame') {
                if (RandomPlayersRoom[room]) {
                    socket.to(room).emit('player-left');
                    socket.to(room).emit('set-player-count', 0)
                    const index = rooms.indexOf(socketRoomMap[socket.id]);
                    if (index > -1) {
                        rooms.splice(index, 1);
                    }
                    delete RandomPlayersRoom[room];
                }
            }
        }

        console.log(numClients, "client has left")
    })
    socket.on('disconnecting', () => {
        socket.emit('player-left')
    })
    console.log(numClients, socket.id)
})
function getRoomType(url) {
    let urlA = url.split('/');
    if (urlA.length < 2) return 'none'
    if (urlA[1] == 'game' || urlA[1] == 'RandomGame' || urlA[1] == 'LocalGame') {
        return urlA[1];
    } else {
        return 'none'
    }
}

function updateRoomPlayer(room) {
    if (RemotePlayersRoom[room]) {
        RemotePlayersRoom[room]++;
    } else {
        RemotePlayersRoom[room] = 1;
    }
}

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
