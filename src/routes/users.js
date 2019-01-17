const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (request, response) => {
	response.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/users/signin',
	failureFlash: true
}));

router.get('/users/signup', (request, response) => {
	response.render('users/signup');
});

router.post('/users/signup', async (request, response) => {

	const { name, email, password, confirmPassword } = request.body;
	const errors = [];

	if (name.length <= 0) {
		errors.push({ text: 'Please insert your name' });
	}

	if (password != confirmPassword) {
		errors.push({ text: 'Password do not match' });
	}

	if (password.length < 4) {
		errors.push({ text: 'Password must be at least 4 characters' });
	}

	if (errors.length > 0) {
		response.render('users/signup', { errors, name, email, password, confirmPassword });
	} else {
		const emailUser = await User.findOne({ email: email });

		if (emailUser) {
			request.flash('errorMessage', 'The Email is already in use');
			response.redirect('/users/signup');
		} else {
			const newUser = new User({ name, email, password });
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			request.flash('successMessage', "You are registered");
			response.redirect('/users/signin');
		}
	}

});

router.get('/users/logout', (request, response) => {
	request.logout();
	response.redirect('/');
});

module.exports = router;
