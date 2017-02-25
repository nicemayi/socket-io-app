var socket = io();

socket.on('connect', function() {
  console.log("Connect to server!");
});

socket.on('disconnect', function() {
  console.log("Disconnected from server!");
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});

const callback = function(data) {
    console.log('Got it', data);
}

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, callback);
