const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator')
const User = require('../model/User');
const Message = require('../model/Message');


exports.new_message_get = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('new-message', {
            title: 'Your new message',
            user: req.user
        })
    } else {
        res.redirect('/log-in')
    }

}

exports.new_message_post = [
    body('title', 'Title must be at least 3 characters long').trim().isLength({ min: 3 }).escape(),
    body('content', 'Content must be at least 3 characters long').trim().isLength({ min: 3 }).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('new-message', {
                title: 'Your new message',
                user: req.user,
                errors: errors.array()
            });
            return;
        }
        User.findById(req.user._id).exec((err, userId) => {
            if (err) {
                return next(err);
            }
            const message = new Message({
                title: req.body.title,
                content: req.body.content,
                author: userId,
            })
            console.log('TRYING TO SAVE MESSAGE')
            message.save((err) => {
                if(err) {
                    console.log('ERROR MESSAGE NOT SAVED')
                return next(err);
                }
            })
            res.redirect('/')
        })

    }
]