var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var jwt = require('jsonwebtoken'); 

var db = mongojs('mongodb://minhanh2296:plant3plant@ds247178.mlab.com:47178/taxiapp', ['users']);

router.get('/login', function (req, res) {
	db.users.count({ password: '0a49f5df7ee5eb808d31771dce9c1a6b72f02709d452fbba8e7024b8675a8657', username: 'minh123' }, function (err, users) {
		if (err) {
			res.send(err);
		}
		res.json(users);
	});
}); 

router.post('/login', function (req, res) {
	var login = req.body.data;

	if (!login.username) {
		res.status(400);
		res.json({
			error: 'Bad data'
		});	
	} else {
		db.users.findOne({ password: login.password, username: login.username }, (error, user) => {
			if (error) {
				res.json({ error: 'Error' });
			}  
			if (!user) {
				res.json({ error: 'Incorrect username or password' });
			} else {
				var userInfo = {
					username: user.username,
					phone: user.phone
				};
				var token = jwt.sign(userInfo, 'secret', {
					expiresIn: 60 * 60 * 24
				});
				res.json({ 
					login: 'Success',
					token,
					userInfo
				});
			}
		});
	}	
});


module.exports = router;
