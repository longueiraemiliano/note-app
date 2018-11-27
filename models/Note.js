const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String
    },
    title: {
        type: String,
        required: true        
    },
    color: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Note = mongoose.model('notes', NoteSchema);