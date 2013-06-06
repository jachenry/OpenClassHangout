var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.post('/courses/:course_id/hangout', function(req, res) {
  var message = "Starting a hangout for course number: " + req.params.course_id;
  console.log(message);
  res.send("<blink>" + message + "</blink>");
});

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);
