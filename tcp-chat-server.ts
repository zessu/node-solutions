var server = require('net').createServer();
let connectedPeople: Array<any> = []; // connected clients
let counter = 0; // keep track of connected clients

server.on('connection', socket => {
  socket.write('You are connected\nPlease choose an alias :');
  socket.id = counter++;
  socket.on('data', data => {
    /* if first time registering
    note:
    if two users nc localhost 8000 at same time,
    the last one to type their name would overwrite the other user as
    they are sharing same global state counter hence need for socket.id = counter++
    */
    if (!connectedPeople[socket.id]) {
      // trim to remove the new line added
      if (data.toString().trim() === '') {
        socket.write('Alias cannot be blank :');
        return;
      }
      // add socket to list of sockets
      connectedPeople[socket.id] =
        {
          name: data,
          socket: socket
        };
        socket.name = data;
      return; // dont send name as message
    }
    // send message to all other connected clients
    connectedPeople.forEach((client) => {
      if (!(client.socket === socket)) {
        client.socket.write('' + socket.name.toString().trim() + ':' + data);
      }
    });
  });
  socket.on('end', () => {
    console.log('server connection has been terminated');
  });
});

server.listen(8000);
