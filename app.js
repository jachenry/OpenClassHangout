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

app.get('/ping', function(req, res) {
  var now = new Date().getTime();
  res.send("<h1> Time: " + now + "</h1>");
});

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
  var courseId = req.params.course_id;
  var requester = req.query.requester;
  var clientId = req.query.clientId;
  var message = "Starting a hangout for course number: " + courseId;
  var hangoutURL = "https://plus.google.com/hangouts/_/";
  console.log(message);
  io.sockets.emit('hangout_' + courseId, { requester:requester, course_id:courseId, hangout_url:hangoutURL, requester_client_id:clientId });
  res.status(201).send("Created");
});

server.listen(port);
console.log('Listening on port ' + port);
