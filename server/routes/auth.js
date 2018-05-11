var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); 

router.post('/auth', (req, res) => {
	var token = req.body.token;
	if (token) {
		jwt.verify(token, 'secret', (err, decoded) => {      
		if (err) {
			res.json({ error: 'Failed to authenticate token.' });    
		} else {
			// if everything is good
			res.json(decoded);  
		}
		});
	} else {
    // if there is no token
    // return an error
     res.json({ 
        error: 'No token provided.' 
    });
  }
});


module.exports = router;
