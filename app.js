var express = require('express');
var phantom = require('phantom');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = 8080;
if ('development' == app.get('env')) {
  console.log("Running in development mode");
  port = 3000;
}

app.get('/', function(req, res){
  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open("https://plus.google.com/hangouts/_/", function(status) {
        console.log("opened google? ", status);
        res.send('login hit');
        ph.exit();
      });
    });
  });
});

app.post('/courses/:course_id/hangout', function(req, res) {
  var message = "Starting a hangout for course number: " + req.params.course_id;
  console.log(message);
  res.send("<blink>" + message + "</blink>");
});

io.sockets.on('connection', function (socket) {
    console.log("SOCKETS =====================>");
});

server.listen(port);
console.log('Listening on port ' + port);
