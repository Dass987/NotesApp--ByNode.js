const express = require('express');
const router = express.Router();

router.get('/users/signin', (request, response) => {
	response.send('Getting in the app');
});

router.get('/users/signup', (request, response) => {
	response.send('Loging in');
});

module.exports = router;
