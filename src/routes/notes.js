const express = require('express');
const router = express.Router();

router.get('/notes/add', (requets, response) => {
	response.render('notes/new-note');
});

module.exports = router;