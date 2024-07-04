const mongoose = require('mongoose');
const Note = require('./schemas/note')

// Database class to handle MongoDB operations
class Database {
    constructor() {
        // MongoDB connection URL
        this.url = "mongodb://localhost:27017/notaty";
    }

    // Connect to the MongoDB database
    connect() {
        mongoose.connect(this.url)
            .then(() => {
                console.log("Database connected successfully")
            })
            .catch((err) => {
                console.log("error in connecting to databse", err);
            })
    }


    // Add a new note to the database
    addNote(note) {
        return new Promise((resolve, reject) => {
            // Set created and updated dates
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();


            // Create a new Note instance and save it to the database
            let newNote = new Note(note);
            newNote.save()
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        })

    }


    // Retrieve all notes from the database
    getNotes() {
        return new Promise((resolve, reject) => {
            Note.find({})
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })

    }

    // Retrieve a note by its ID
    getNoteById(id) {
        return new Promise((resolve, reject) => {
            Note.findById(id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    // Update a note by its ID and return the updated note
    updateNote(note) {
        return new Promise((resolve, reject) => {
            // Update the updated date
            note["updatedDate"] = new Date();
            Note.findByIdAndUpdate(note["_id"], note, { new: true })
                .then(data => {
                    console.log(data)
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    // Delete a note by its ID
    deleteNote(id) {
        return new Promise((resolve, reject) => {
            Note.findByIdAndDelete(id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }



    // Retrieve notes by their title using a case-insensitive regex
    getNotesByTitle(noteTitle) {
        return new Promise((resolve, reject) => {
            const query = {title: {$regex: new RegExp(noteTitle,'i')} };
            Note.find(query)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

module.exports = Database;