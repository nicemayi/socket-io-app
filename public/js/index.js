var socket = io();
socket.on('connect', function() {
  console.log("Connect to server!");
  socket.emit('createMessage', {
      from: 'Zhe',
      text: 'Zhe text'
  });
});
socket.on('disconnect', function() {
  console.log("Disconnected from server!");
});
socket.on('newMessage', function(message) {
    console.log('newMessage', message);
})
