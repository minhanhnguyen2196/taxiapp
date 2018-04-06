var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['bookings']);

// get booking from database
router.get('/bookings', (req, res) => {
	db.bookings.find((err, bookings) => {
		if (err) {
			res.send(err);
		}
		return res.json(bookings);
	});
}); 

// post booking 
router.post('/bookings', (req, res) => {
	var booking = req.body;
	var io = req.app.io;
	var chosenDriver = booking.chosenDriver;
	if (!booking.username) {
		res.status(400);
		res.json({
			error: 'Bad data'
		});	
	} else {
		db.bookings.save(booking, (err, savedBooking) => {
			if (err) {
				res.send(err);
			}
			res.json(savedBooking);
			if (chosenDriver.socketId) {
				io.to(chosenDriver.socketId).emit(chosenDriver.socketId + 'driverRequest', savedBooking);
			} else console.log('Driver not connected');
		});
	}
});

// update booking status
router.put('/bookings/:id', (req, res) => {
    var io = req.app.io;
    var booking = req.body;
    if (!booking.status) {
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    } else {
        db.bookings.update({ _id: mongojs.ObjectId(req.params.id) }, { 
			$set: { 
				status: booking.status 
			} }, (err, updated) => {
				if (err) {
				res.send(err);
				}
				if (updated) {
				// send back updated booking
					db.bookings.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, updatedBooking) => {
						if (error) {
						res.send(error);
					}
					res.send(updatedBooking);
					//console.log(confirmedBooking);
					io.emit('action', {
					type: 'UPDATE_BOOKING',
					payload: updatedBooking
				});
					console.log('OK');
				});
			}
		});
    }
});


module.exports = router;
