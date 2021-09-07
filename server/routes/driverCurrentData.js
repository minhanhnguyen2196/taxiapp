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
router.get('/driverCurrentData', (req, res) => {
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
router.get('/driverCurrentData/:id', (req, res) => {
	var io = req.app.io;
    db.driverCurrentData.findOne({ socketId: req.params.id }, (err, location) => {
        if (err) {
            res.send(err);
        }
        res.send(location);
        io.to(req.params.id).emit('trackDriver', location);
    });
});


//Update driver current location
router.put('/driverCurrentLocation/:id', (req, res) => {
    var io = req.app.io;
    var currentData = req.body;
    var latitude = parseFloat(currentData.latitude);
    var longitude = parseFloat(currentData.longitude);
    if (!currentData) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.driverCurrentData.update({ _id: mongojs.ObjectId(req.params.id) }, { 
            $set: {
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
            db.driverCurrentData.findOne({ _id: mongojs.ObjectId(req.params.id) }, (error, updatedData) => {
                if (error) {
                    res.send(error);
                }
                res.json(updatedData);
                if (currentData.userSocketID) {
                    io.to(currentData.userSocketID).emit('action', {
                    type: 'UPDATE_DRIVER_LOCATION',
                    payload: updatedData
                });
                }   
            });
        }
    });
    }
});


router.put('/driverCurrentStatus/:id', (req, res) => {
    var io = req.app.io;
    var currentData = req.body;
    if (!currentData) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.driverCurrentData.update({ _id: mongojs.ObjectId(req.params.id) }, { 
            $set: {
            status: currentData.status
        } }, (err, updated) => {
        if (err) {
            res.send(err);
        } else res.json(updated);
    });
    }
});
module.exports = router;