var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../model/User');
const auth_controller = require('../controller/auth_controller');
const message_controller = require('../controller/message_controller')
const board_controller = require('../controller/board_controller');


/* TODO : VIEW + CONDITIONNAL RENDERING FOR MESSAGE BOARD
ROUTING DEPENDING ON USER 


/* GET home page. */
router.get('/', board_controller.index);

// NEW MESSAGES
router.get('/new-message', message_controller.new_message_get)
router.post('/new-message', message_controller.new_message_post)


// AUTHENTIFICATION CONTROLLERS
router.get('/sign-up', auth_controller.sign_up_get);
router.post('/sign-up', auth_controller.sign_up_post);


// LOG IN CONTROLLER
router.get('/log-in', auth_controller.log_in_get)
router.post('/log-in', auth_controller.log_in_post)

/// LOG OUT CONTROLLER

router.get('/log-out', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
  });
  res.redirect('/')
})

module.exports = router;
