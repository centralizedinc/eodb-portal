
const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);



module.exports = router;