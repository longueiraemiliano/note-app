const express = require('express');
const router = express.Router();
const passport = require('passport');
const Note = require('../../models/Note');
const mongoose = require('mongoose');

const validateNoteInput = require('../../validations/note');

// @route   GET api/notes/test
// @desc    Notes post route
// @access  Public
router.get('/test', (req, res) => { res.json({ msg: "Notes Works"}) });

// @route   GET api/notes
// @desc    Get current users notes
// @access  private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {    
    Note.find({ user: req.user.id })
        .sort({date: -1})            
        .then(notes => {
            res.json(notes);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/notes
// @desc    Create or update user notes
// @access  private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Get fields
    const { errors, isValid } = validateNoteInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    const noteFields = {};
    noteFields.user = req.user.id;
    if(req.body.title) noteFields.title = req.body.title;
    if(req.body.text) noteFields.text = req.body.text;
    if(req.body.color) noteFields.color = req.body.color;

    Note.findById(req.body._id)
        .then(note => {
            if (note) {
                // Update            
                Note.findByIdAndUpdate(
                    req.body._id, 
                    { $set: noteFields }, 
                    { new: true}
                )
                .then(note => res.json(note));
            } else {
                // Create
                // Save Note
                new Note(noteFields).save().then(note => res.json(note));
            }
        })
        .catch(err => res.status(404).json(err));
});

// @route   DELETE api/notes/:id
// @desc    Delete the Note
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({ user: req.user.id})
        .then(profile => {
            Note.findById(req.params.id)
                .then(note => {
                    // Check for note owner
                    if(note.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized' });
                    }

                    // Delete 
                    note.remove().then(() => res.json({ success: true}))
                        .catch(err => res.status(404).json({ notenotfound: 'Note not found'}));
                });
        })
        .catch(err => res.status(404).json(err));    
});

module.exports = router;