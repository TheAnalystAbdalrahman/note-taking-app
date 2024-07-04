const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const Database = require('./Database');
const db = new Database();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a POST API to add a new note
app.post('/notes', (req, res) => {
    const body = req.body;
    console.log("Note Body: ", body);
    db.addNote(body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a GET API to retrieve notes
app.get('/notes', (req, res) => {
    const { title } = req.query;
    if (title) {
        // If title query parameter is provided, search notes by title
        db.getNotesByTitle(title)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        // Otherwise, retrieve all notes
        db.getNotes()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
});

// Create a GET API to retrieve a note by its ID
app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteById(id)
        .then(data => {
            if (!data) {
                res.status(404).send("Note ID does not exist " + id);
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a PUT API to update a note
app.put('/notes', (req, res) => {
    db.updateNote(req.body)
        .then(data => {
            if (!data) {
                res.status(404).send("Note ID does not exist " + req.body["_id"]);
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a DELETE API to delete a note by its ID
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.deleteNote(id)
        .then(data => {
            if (!data) {
                res.status(404).send("Note ID does not exist " + id);
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Define the port the server will listen on
const port = 3000;

// Start the server and connect to the database
app.listen(port, () => {
    console.log(`Server has started on port ${port}...`);
    db.connect();
});
