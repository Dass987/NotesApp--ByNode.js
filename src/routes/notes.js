const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes', isAuthenticated, async (request, response) => {
	
	const notes = await Note.find({ user: request.user.id }).sort({ date: 'desc' });
	response.render('notes/all-notes', { notes });

});

router.get('/notes/add', isAuthenticated, (requets, response) => {
	response.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (request, response) => {
	
	const { title, description } = request.body;
	const errors = [];

	if (!title) {
		errors.push({ text: "Please write a title" });
	}

	if (!description) {
		errors.push({ text: "Please write a description" });
	}

	if (errors.length > 0) {

		response.render('notes/new-note', {
			errors,
			title,
			description
		});

	} else {

		const newNote = new Note({
			title,
			description
		});
		newNote.user = request.user.id;
		await newNote.save();
		request.flash('successMessage', "Note Added Successfully");
		response.redirect('/notes');

	}
	
});

router.get('/notes/edit/:id', isAuthenticated, async (request, response) => {
	
	const note = await Note.findById(request.params.id);
	response.render('notes/edit-note', { note });

});

router.put('/notes/edit-note/:id', async (request, response) => {

	const { title, description } = request.body;
	const note = await Note.findByIdAndUpdate(request.params.id, { title, description });
	request.flash('successMessage', 'Note updated successfully');
	response.redirect('/notes');

});

router.delete('/notes/delete/:id', isAuthenticated, async (request, response) => {

	await Note.findByIdAndDelete(request.params.id);
	request.flash('successMessage', 'Note deleted successfully');
	response.redirect('/notes');

});

module.exports = router;