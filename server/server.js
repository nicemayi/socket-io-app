const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected!');
  socket.on('createMessage', (message) => {
      console.log('createMessage', message);

    // socket.emit from admin text Welcome to the chat app
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    // socket.broadcast.emit from admin text new user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date()
    });

    socket.broadcast.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });
});

app.use(express.static(publicPath));
server.listen(3000, () => {
  console.log(`Server is up on port ${port}...`);
})
