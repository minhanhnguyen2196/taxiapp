var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

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
		db.users.count({ password: login.password, username: login.username }, (error, count) => {
			if (error) {
				res.json({ error: 'Error' });
			}  
			if (count !== 1) {
				res.json({ error: 'Incorrect username or password' });
			} else res.json({ login: 'Success' });
		});
	}			
});


module.exports = router;
