const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    createdDate: {type: Date, require: true},
    updatedDate: {type: Date, require: true},
});


module.exports = mongoose.model('Note', noteSchema);