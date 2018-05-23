
// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// app.use(express.static("."));
// app.get('/', function (req, res) {
//    res.redirect('public/index.html');
// });
// server.listen(3000);

// var express = require('express');
// var path = require('path');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var obstacles = [];
// var golds = [];
// var player
// var base
// // Define the port to run on
// app.set('port', process.env.PORT || 3000);

// app.use(express.static(path.join(__dirname, 'public')));

// // Listen for requests
// var server = app.listen(app.get('port'), function () {
//   var port = server.address().port;
//   console.log('Magic happens on port ' + port);
//  });
// io.on('connection',function (socket){
//    io.sockets.emit('display canvas', base, player, obstacles, golds);
//    socket.on('send all coords', function (data){

//    })
// });

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var width = 16;
var height = 16;
 var playerStartCoords 
app.use(express.static('public'));

app.app("/", function (req, res) {
  res.sendFile(__dirname + 'public/index.html')
});
server.listen(300, function () {
  console.log('Server is runing on port 3000');
})
var colorCounter = 0;

io.on('connection', function (socket) {
  socket.emit('send color', colors[colorCounter]);
  socket.emit('send start coordinates', player)
})