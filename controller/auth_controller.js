const bcrypt = require('bcrypt');
const async = require('async');
const { body, validationResult } = require('express-validator')
const User = require('../model/User');
const passport = require('passport');



// SIGN UP AUTH CONTROLLERS
exports.sign_up_get = (req, res, next) => {
    res.render('sign-up'), {
        title: 'Sign up',
    }
}

exports.sign_up_post = [
    body('name').trim().isLength( {min: 3}).withMessage('Name must be at least 3 characters').escape(),
    body('email', 'Email invalid').trim().escape().isEmail(),
    body('password').exists(),
    body('passwordConfirmation', 'The password and confirmation fields must have the same value').exists()
    .custom((value, {req}) => value === req.body.password),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log('error in validation')
            res.render('sign-up',
            {title: 'Sign-up',
            errors: errors.array()
            });
            return;
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
    
            user.save((err) => {
                if (err) {
                    return next(err)
                }
                res.redirect('log-in')
            })
          })
    },
]


// LOG IN CONTROLL

exports.log_in_get = (req, res, next) => {

    res.render('log-in', {
        title: 'Log in'
    })
}

exports.log_in_post = 
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true
});

