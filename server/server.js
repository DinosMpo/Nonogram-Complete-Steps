//modules
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const NonogramMultiplayerGame = require('./nonogramMultiplayerGame');
const app = express();
const clientPath = __dirname + '/../client';
console.log('Serving static from ' + clientPath);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);
let clients = 0;
let waitingPlayer = null;
let roomno = 1;

//server connecton
io.on('connection', (sock) => {
	//when a user connects to the server
	let inRoom = 0;
	let multiplayerGame;
	let playersInformation;
	clients ++;
	console.log('Someone connected');
	sock.emit('message', 'Hi you are connected');

	sock.join('all');

	//Message to all connected clients
    io.sockets.emit('refresh counter', { description: 'Players online: ' + clients});

    sock.on('multiplayer', (data) => {
    	if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) {
    		roomno++;
		}
		if(waitingPlayer) {
		    inRoom = roomno;
		    sock.leave('all');
		    sock.join('room-'+inRoom);
		    let playersInformation = {};
		    playersInformation.player1 = waitingPlayer.id;
		    playersInformation.player2 = sock.id
		    playersInformation.room    = inRoom;
		    waitingPlayer.emit('player', 'player1');
		    sock.emit('player', 'player2');
		    io.to("room-"+inRoom).emit('multiplayer', playersInformation);
		    sock.emit('wait');
		    sock.to("room-"+inRoom).broadcast.emit('your turn to play');
		    waitingPlayer = null;
		}else {
		    inRoom = roomno;
		    sock.leave('all');
		    sock.join("room-"+inRoom);
		    waitingPlayer = sock;
		    waitingPlayer.emit('room', inRoom);
		    waitingPlayer.emit('message', 'Waiting for an opponent');
		}
    });

    sock.on('multiplayer game', (data)=> {
    	multiplayerGame = data;
    });

    sock.on('correct', (data) => {
    	io.to("room-"+inRoom).emit('correct');
    });

    sock.on('update progress', (data) => {
    	sock.to("room-"+inRoom).broadcast.emit('update', data);
    });

    sock.on('play next level', (data) => {
    	io.to("room-"+inRoom).emit('play next level', data);
    });

    sock.on('multiplayer finished', () => {
    	sock.to("room-"+inRoom).broadcast.emit('multiplayer finished');
    });

    sock.on('exit-multiplayer', (data) => {
    	io.nsps['/'].sockets[sock.id].leave('room-'+inRoom);
		io.nsps['/'].sockets[sock.id].join('all');
		if(sock.id === data.player1) {
		   io.to(data.player2).emit('exit-multiplayer', 'Player 1 left the lobby...');
		   io.nsps['/'].sockets[data.player2].leave('room-'+inRoom);
		   io.nsps['/'].sockets[data.player2].join('all');
		}else if(sock.id === data.player2) {
		   io.to(data.player1).emit('exit-multiplayer','Player 2 left the lobby...');
		   io.nsps['/'].sockets[data.player1].leave('room-'+inRoom);
		   io.nsps['/'].sockets[data.player1].join('all');
		}
		inRoom = 0;
    });

    sock.on('exit multiplayer waiting lobby', () => {
    	waitingPlayer = null;
		sock.leave("room-"+inRoom);
		inRoom = 0;
    });

    sock.on('disconnect', () => {
    	clients --;
		io.sockets.emit('broadcast', { description: 'Players online: ' + clients });
		if(inRoom != 0) {
		  if(multiplayerGame) {
		    if(sock.id === multiplayerGame.player1) {
		      io.to(multiplayerGame.player2).emit('player-left', 'Player 1 left the lobby...');
		    }else if(sock.id === multiplayerGame.player2) {
		       io.to(multiplayerGame.player1).emit('player-left','Player 2 left the lobby...');
		    }
		  }
		}
    });

    sock.on('player-left', () => {
    	iRoom =0;
		io.nsps['/'].sockets[sock.id].leave('room-'+inRoom);
		io.nsps['/'].sockets[sock.id].join('all');
    });

    sock.on('end-turn', () => {
	    sock.emit('end-turn');
	    sock.to("room-"+inRoom).broadcast.emit('your turn to play');
	});
});

server.on('error', (err) => {
	console.log('Server error : ' + err);
});

server.listen(8080, () => {
	console.log('Nonogram game started on 8080');
});