var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var jwt = require('jsonwebtoken'); 

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
		db.users.count({ phone: register.phone }, (error, count) => {
			if (count > 0) {
				res.json({ error: 'Phone number used' });
			} else {
				db.users.save(register, (err, savedUser) => {
				if (err) {
					res.send(err);
				}
				var user = {
					username: savedUser.username,
					phone: savedUser.phone
				};
				var token = jwt.sign(user, 'secret', {
					expiresIn: 60 * 60 * 24
				});
				res.json({ 
					register: 'Success',
					token,
					user
				});
			});
			}
		});
	}		
});


module.exports = router;
