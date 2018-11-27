const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNoteInput(data) { 
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";

    if(validator.isEmpty(data.title)) {
        errors.title = 'Note Title is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}