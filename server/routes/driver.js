var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['drivers']);


//Get Single Driver
router.get('/driver/:id', (req, res) => {
    db.drivers.findOne({ driverID: req.params.id }, (err, driver) => {
        if (err) {
            res.send(err);
        }
       res.send(driver);
    });
});


router.get('/driver', (req, res) => {
	db.drivers.count((err, driver) => {
		if (err) {
			res.send(err);
		}
		return res.json(driver);
	});
}); 

module.exports = router;