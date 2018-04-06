var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['driverCurrentData']);


//update driver socket id

router.put('/driverLocationSocket/:id', (req, res) => {
	var io = req.app.io;
    console.log(req.body);
	if (!req.body) {
		res.status(400);
		res.json({
			error: 'Bad data'
		});
	} else {
		db.driverCurrentData.update({ _id: mongojs.ObjectId(req.params.id) }, 
			{ $set: { socketId: req.body.socketId } }, (err, updateDetails) => {
				if (err) {
					res.send(err);
                    console.log(err);
				} else {
					res.send(updateDetails);
				}
		});
	}
});

// get nearby drivers
router.get('/driverLocation', (req, res) => {
	db.driverCurrentData.ensureIndex({ 'coordinate': '2dsphere' });
	db.driverCurrentData.find({
        $and: [
            { 
                coordinate: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
                    },
                    $maxDistance: 10000
                }
                } 
            },
            {
                status: { $eq: 'free' }
            }
        ]	
		}, (err, location) => {
			if (err) {
				res.send(err);
			} else {
				res.send(location);
			}
	});
});

// track driver
router.get('/driverLocation/:id', (req, res) => {
	var io = req.app.io;
    db.driverCurrentData.findOne({ socketId: req.params.id }, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.send(location);
        io.to(req.params.id).emit('trackDriver', location);
    });
});


//Update Location by driver to user
router.put('/driverLocation/:id', (req, res) => {
    var io = req.app.io;
    var location = req.body;
    var latitude = parseFloat(location.latitude);
    var longitude = parseFloat(location.longitude);
    if (!location) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.driverCurrentData.update({ _id: mongojs.ObjectId(req.params.id) }, { 
            $set: {
        	//socketId: location.socketId,
        	coordinate: {
                'type': 'Point',
        		coordinates: [
                    longitude,
        			latitude
    			]
    		}
    	} }, (err, updated) => {
        if (err) {
            res.send(err);
        }
        if (updated) {
            //Get updated location
            db.driverCurrentData.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, updatedLocation) => {
                if (error) {
                    res.send(error);
                }
                res.send(updatedLocation);
                io.emit('action', {
                    type: 'UPDATE_DRIVER_LOCATION',
                    payload: updatedLocation
                });
            });
        }
    });
    }
});

module.exports = router;