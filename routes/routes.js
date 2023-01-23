var express = require('express');
var router = express.Router();
const auth_controller = require('../controller/auth_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// AUTHENTIFICATION CONTROLLERS
router.get('/sign-up', auth_controller.sign_up_get);

router.get('/log-in', auth_controller.log_in_get)





module.exports = router;
