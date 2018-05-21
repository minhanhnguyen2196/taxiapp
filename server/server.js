var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); 

var auth = require('./routes/auth');
var register = require('./routes/register');
var login = require('./routes/login');
var apiRoutes = express.Router(); 

apiRoutes.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'secret', (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});


var index = require('./routes/index');
var bookings = require('./routes/bookings');
var driverLocationSocket = require('./routes/driverCurrentData');
var driverCurrentData = require('./routes/driverCurrentData');
var driverCurrentLocation = require('./routes/driverCurrentData');
var driverCurrentStatus = require('./routes/driverCurrentData');
var driver = require('./routes/driver');
var user = require('./routes/users');


var app = express();

var port = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server, { pingTimeout: 30000, pingInterval: 30000 });

server.listen(port);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('superSecret', 'jsonwebtoken'); 

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', auth);
app.use('/api', register);
app.use('/api', login);
app.use('/api', apiRoutes);
app.use('/', index);
app.use('/api', bookings);
app.use('/api', driverLocationSocket);
app.use('/api', driverCurrentData);
app.use('/api', driverCurrentLocation);
app.use('/api', driverCurrentStatus);
app.use('/api', driver);
app.use('/api', user);

app.io = io.on('connection', (socket) => {
	console.log('User is connected: ' + socket.id);
	socket.emit('confirm connection', 'Confirmed');
	socket.on('hello', (data) => {
		socket.emit('hello driver', 'hello again');
		console.log(data);
	});
	socket.on('room', (userSocketID) => {
		socket.join(userSocketID);
	});
	socket.on('left room', (userSocketID) => {
		socket.leave(userSocketID);
	});
});

