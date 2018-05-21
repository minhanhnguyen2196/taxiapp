var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['bookings']);
var db2 = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['driverCurrentData']);

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
	var longitude = booking.pickUp.longitude;
	var latitude = booking.pickUp.latitude;
	if (!booking.username) {
		res.status(400);
		res.json({
			error: 'Bad data'
		});	
	} else {
		db2.driverCurrentData.ensureIndex({ 'coordinate': '2dsphere' });
		db2.driverCurrentData.findOne({
        	$and: [
            { 
              coordinate: {
              	$near: {
                  $geometry: {
                      type: 'Point',
                      coordinates: [parseFloat(longitude), parseFloat(latitude)]
                  },
                  $maxDistance: 3000
              }
              } 
            },
            {
              status: { $eq: 'available' }
            },
            {
            	"vehicle.type": { $eq: booking.vehicle }
            }
			]	
		}, (err, driver) => {
			if (err) {
				res.json({ error: 'No driver found' });
			}
			if (driver) {
				db.bookings.save(booking, (error, savedBooking) => {
					res.json(savedBooking);
					io.to(driver.socketId).emit('driver request', savedBooking);
					db2.driverCurrentData.update(
					{ driverID: driver.driverID }, 
					{ 
						$set: {
							status: 'booked'
						} 
					});
				});
			} else res.json({ error: 'No driver found' });
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
   }
	db.bookings.update({ _id: mongojs.ObjectId(req.params.id) }, { 
	$set: { status: booking.status } }, (err, updated) => {
		if (updated) {
		// send back updated booking
			db.bookings.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, updatedBooking) => {
				if (error) {
				res.send(error);
			}
			res.send(updatedBooking);
			switch (updatedBooking.status) {
				case 'confirmed': {
					db.bookings.update(
						{ _id: mongojs.ObjectId(req.params.id) }, 
						{ $set: { driver: { socketID: booking.socketID, driverID: booking.driverID } } }, 
						(errs, updatedDriverToBooking) => {
							if (updatedDriverToBooking) {
								db.bookings.findOne({ _id: mongojs.ObjectId(req.params.id) }, (not, docs) => {
									io.to(updatedBooking.userSocketID).emit('action', {
										type: 'UPDATE_BOOKING',
										payload: docs
									});
								});
							}	
					});
					break;
				}
				case 'pending': {
					io.to(booking.socketID).emit('leave room', 'Leave room');
					var longitude = updatedBooking.pickUp.longitude;
					var latitude = updatedBooking.pickUp.latitude;
					db2.driverCurrentData.ensureIndex({ 'coordinate': '2dsphere' });
					db2.driverCurrentData.findOne({
					$and: [{ 
						coordinate: {
							$near: {
							$geometry: {
								type: 'Point',
								coordinates: [parseFloat(longitude), parseFloat(latitude)]
							},
							$maxDistance: 3000
							} } 
						},
					{ status: { $eq: 'available' } },
					{
						"vehicle.type": { $eq: booking.vehicle }
					}
					] }, (errors, driver) => {
						if (driver) {
							io.to(driver.socketId).emit('driver request', updatedBooking);
							db2.driverCurrentData.update(
							{ driverID: driver.driverID }, 
							{ 
								$set: {
									status: 'booked'
								} 
							});
							db2.driverCurrentData.update(
							{ driverID: booking.driverID }, 
							{ 
								$set: {
									status: 'not available'
								} 
							});
						}
					});
					break;
				}
				case 'cancel': {
					db.bookings.update({ _id: mongojs.ObjectId(req.params.id) }, {
					$set: {
						driver: { socketID: booking.socketID, driverID: booking.driverID } 
					}
					});
					io.to(updatedBooking.userSocketID).emit('action', {
						type: 'UPDATE_BOOKING',
						payload: updatedBooking
					});
					io.to(booking.socketID).emit('leave room', 'Leave room');
					break;
				}

				case 'started' :
				case 'arrived': {
					io.to(updatedBooking.userSocketID).emit('action', {
						type: 'UPDATE_BOOKING',
						payload: updatedBooking
					});
					break;
				}
				case 'completed': {
					io.to(updatedBooking.userSocketID).emit('action', {
					type: 'UPDATE_BOOKING',
					payload: updatedBooking
				});
				io.to(booking.socketID).emit('leave room', 'Leave room');
				break;	
				}
				default: break;
			}
		});
		}
	});
});


module.exports = router;
