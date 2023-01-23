const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator')
const User = require('../model/User')

// SIGN UP AUTH CONTROLLERS
exports.sign_up_get = (req, res, next) => {
    res.render('sign-up'), {
        title: 'Sign up',
    }
}

exports.sign_up_post = [
    body('name').trim().isLength( {min: 3}).withMessage('Name must be at least 3 characters').escape(),
    body('email').trim().escape().isEmail(),
    body('password').exists(),
    body('passwordConfirmation', 'The password and confirmation fields must have the same value').exists()
    .custom((value, {req}) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        if(!errors.isEmpty()) {
            res.render('sign-up');
            return;
        }
        user.save((err) => {
            if (err) {
                return next(err)
            }
            res.redirect('log-in')
        })
    },
]

exports.log_in_get = (req, res, next) => {
    res.render('log-in', {
        title: 'Log in'
    })
}

