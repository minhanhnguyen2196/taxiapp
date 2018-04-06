var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var bookings = require('./routes/bookings');
var driverLocationSocket = require('./routes/driverLocation');
var driverLocation = require('./routes/driverLocation');
var register = require('./routes/register');
var login = require('./routes/login');
var driver = require('./routes/driver');

var app = express();

var port = 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server, { pingTimeout: 30000, pingInterval: 30000 });

server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/api', bookings);
app.use('/api', driverLocationSocket);
app.use('/api', driverLocation);
app.use('/api', register);
app.use('/api', login);
app.use('/api', driver);

app.io = io.on('connection', (socket) => {
	console.log('User is connected: ' + socket.id);
	socket.emit('confirm connection', 'Confirmed');
	socket.on('hello', (data) => {
		socket.emit('hello driver', 'hello again');
		console.log(data);
	});
});

