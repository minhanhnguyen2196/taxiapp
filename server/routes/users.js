var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['users']);


//update driver socket id
router.put('/users/:id', (req, res) => {
	var io = req.app.io;
    console.log(req.body);
	if (!req.body) {
		res.status(400);
		res.json({
			error: 'Bad data'
		});
	} else {
		db.users.update({ phone: req.params.id }, 
			{ $set: { socketId: req.body.socketId } }, (err, updatedUser) => {
				if (err) {
					res.send(err);
                    console.log(err);
				} else {
					res.send(updatedUser);
				}
		});
	}
});

module.exports = router;