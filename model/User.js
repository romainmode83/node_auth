const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String, 
        minLength: 3,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
    },
    isMember: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})


module.exports = mongoose.model('User', User);