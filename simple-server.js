"use strict";
exports.__esModule = true;
var server = require('net').createServer();
var connectedPeople = []; // connected clients
server.on('connection', function (socket) {
    connectedPeople.push(socket); // add socket to list of sockets
    console.log(connectedPeople.length + " people connected\n");
    socket.write('You are connected\n');
    socket.on('data', function (data) {
        connectedPeople.forEach(function (connection) {
            if (!(connection === socket)) {
                connection.write(data);
            }
        });
    });
    socket.on('end', function () {
        console.log('server connection has been terminated');
    });
});
server.listen(8000);
