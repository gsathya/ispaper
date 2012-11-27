var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , jquery = require('jquery');

server.listen(8080);

// custom heroku settings
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var text;

io.sockets.on('connection', function (socket) {

    // send data to a new connection
    if (text !== undefined) {
        console.log(text);
        socket.emit('message', text);
    }

    socket.on('text', function (data) {
        text = data;
        socket.broadcast.emit('message', data);
    });
});
