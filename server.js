const fs = require('fs')
const path = require('path')
const notes = require('./db/db.json')
let notes = require('./db/db.json')



const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// provide file path for static resources
app.use(express.static('public'));

// api routes
app.get('/api/notes', (req, res) => {
    console.log("fetching notes")
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    // validate incoming content todo
    req.body.id = notes.length.toString()
    res.json(req.body)
    createNewNote(req.body, notes)
})

app.delete('/api/notes/:id', (req, res) => {
    console.log("deleting one note", req.params.id)
    let currentNotes = notes
    let filteredNotes = currentNotes.filter(note => note.id != req.params.id)
    // console.log(filteredNotes)
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(filteredNotes), null, 2)

    console.log("note deleted", req.params.id)
    console.log("new notes", filteredNotes)
    res.json(filteredNotes)
    notes = filteredNotes;

    // error handling - sent an id that doesn't exist
    // renderNoteList(filteredNotes)
    // return filteredNotes
})

// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

function createNewNote(body, notes) {
    // write to json
    console.log(body) // object with 2 properties, title and text
    notes.push(body)
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes), null, 2)
    // return body
}

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});