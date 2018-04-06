var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['users']);

router.get('/register', function (req, res) {
	db.users.count({ username: 'minh anh' }, function (err, users) {
		if (err) {
			res.send(err);
		}
		res.json(users);
	});
}); 

router.post('/register', function (req, res) {
	var register = req.body.data;

	if (!register.username) {
		res.status(400);
		res.json({
			error: 'Bad data'
		});	
	} else {
		db.users.count({ phone: register.phone }, function (error, count) {
			if (error) {
				res.send(error);
			}  
			if (count > 0) {
				res.json({ error: 'Phone number used' });
			} else {
				db.users.save(register, function (error, savedUser) {
				if (error) {
					res.send(error);
				}
				res.json(savedUser);
			});
			}		
		});
	}			
});


module.exports = router;
