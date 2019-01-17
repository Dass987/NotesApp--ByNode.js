const express = require('express');
const router = express.Router();

router.get('/users/signin', (request, response) => {
	response.render('users/signin');
});

router.get('/users/signup', (request, response) => {
	response.render('users/signup');
});

module.exports = router;
