//modules
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const clientPath = __dirname + '/../client';
console.log('Serving static from ' + clientPath);
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

//server connecton
io.on('connection', (sock) => {
	//when a user connects to the server
	console.log('Someone connected');
	sock.emit('message', 'Hi you are connected');

	sock.on('disconnect', () => {
		console.log('user disconnect');
	});
});

server.on('error', (err) => {
	console.log('Server error : ' + err);
});

server.listen(8080, () => {
	console.log('Nonogram game started on 8080');
});