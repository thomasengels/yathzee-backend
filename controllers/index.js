var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var ctrlAuth = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users');

router.get('/test', function(req, res){
  res.json({message : 'Connection succeeded'});
});

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.use('/users', require('./users'));
router.use('/games', require('./game'));

module.exports = router;