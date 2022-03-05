const fs = require("fs")
const path = require("path")
const notes = require("./db/db.json")

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// provide file path for static resources
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    // validate incoming content 
    // write incoming note to file
    // console.log(req.body)
    res.json(req.body)
    createNewNote(req.body, notes)

})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

function createNewNote(body, notes) {
    // write to json
    console.log(body) // object with 2 properties, title and text
    notes.push(body)
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes), null, 2)
    // return body
}




// const htmlRoutes = require("./routes/htmlRoutes")
// const apiRoutes = require("./routes/apiRoutes")
// app.use("/api", apiRoutes)
// app.use('/', htmlRoutes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});