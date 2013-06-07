var express = require('express');
var hangout = require('hangout');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = 8080;
if ('development' == app.get('env')) {
  console.log("Running in development mode");
  port = 3000;
}

app.configure(function(){
  app.use(express.bodyParser());
});

app.get('/ping', function(req, res) {
  var now = new Date().getTime();
  res.send("<h1> Time: " + now + "</h1>");
});

app.post('/courses/:course_id/hangout', function(req, res) {
  var courseId = req.params.course_id;
  var requester = req.query.requester;
  var clientId = req.query.client_id;
  var message = "Starting a hangout for course number: " + courseId;

  console.log(message);

  hangout.create(function(hangoutURL){
    io.sockets.emit('hangout_' + courseId, { requester:requester, course_id:courseId, hangout_url:hangoutURL, requester_client_id:clientId });
    res.status(201).send("Created");
  }, function(){
    res.status(500).send("Error");
  })
});

server.listen(port);
console.log('Listening on port ' + port);
