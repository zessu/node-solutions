var server = require('net').createServer();
let connectedPeople: Object = {}; // connected clients

server.on('connection', socket => {
  // console.log(`${connectedPeople.length} people connected\n`);
  socket.write('You are connected\nPlease choose an alias :');
  socket.on('data', data => {
    // if first time registering
    if (!connectedPeople[socket]) {
      console.log('data type is >>>>', data);
      if (data.toString().trim() === '') {
        socket.write('Alias cannot be blank');
      }
      return;
    }
    connectedPeople[data] = socket; // add socket to list of sockets
    // send message to all other connected clients
    Object.entries(connectedPeople).forEach(([key, connection]) => {
      if (!(connection === socket)) {
        connection.write(data);
      }
    });
  });
  socket.on('end', () => {
    console.log('server connection has been terminated');
  });
});

server.listen(8000);
