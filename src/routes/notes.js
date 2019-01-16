const express = require('express');
const router = express.Router();

router.get('/notes', (request, response) => {
	response.send('DB notes');
})

module.exports = router;