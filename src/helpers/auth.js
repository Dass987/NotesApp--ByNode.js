const helpers = {};

helpers.isAuthenticated = (request, response, next) => {

	if (request.isAuthenticated()) {
		return next();
	} else {
		request.flash('error', 'Not Authorized');
		response.redirect('/users/signin');
	}

};

module.exports = helpers;