const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  // single pipe send message back
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
  // to all but the current connected user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
      console.log("haha", callback);
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
})
