var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , jquery = require('jquery');

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});

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
