const router = require('express').Router();
let notes = require('../../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// api routes
router.get('/notes', (req, res) => {
	res.json(notes);
});

router.post('/notes', (req, res) => {
	// give the note a unique id
	req.body.id = uuidv4();
	res.json(req.body);
	createNewNote(req.body, notes);
});

router.delete('/notes/:id', (req, res) => {
	let currentNotes = notes;
	let filteredNotes = currentNotes.filter(note => note.id != req.params.id);
	fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNotes), null, 2);

	res.json(filteredNotes);
	notes = filteredNotes;
});

function createNewNote(body, notes) {
	// write to json
	notes.push(body);
	fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes), null, 2);
}

module.exports = router;
