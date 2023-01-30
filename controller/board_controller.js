const async = require('async');
const Message = require('../model/Message')

exports.index = (req, res, next) => {
    Message.find().populate('author').exec((err, messages) => {
        if (err) {
            return next(err);
        }
        res.render('index', { 
            title: 'Message board',
            user: req.user,
            messages
          });
    });
    };
