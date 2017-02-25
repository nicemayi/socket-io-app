var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message1) {
  console.log('newMessage', message1);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('Got it', data);
});
