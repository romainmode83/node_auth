const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    content: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Message', Message);