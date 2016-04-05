//Import express lib
var express = require('express');
var bodyParser = require('body-parser');

var session = require('express-session');
var path = require('path');
//create new instance of express server
var app = express();


//Run the server with specific port
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


//Set the maping for the static files
app.use(require('connect-livereload')());
app.use(bodyParser.json());
app.use(express.static( path.join(__dirname, '/../app'))); //'./../app'));

