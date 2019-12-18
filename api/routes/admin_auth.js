
const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.route('/')
    .post(function (req, res, next) {
        passport.authenticate('admin-login', function (err, user, info) {
            // console.log("passport login auth user: " + JSON.stringify(user))
            // console.log("passport login auth err: " + JSON.stringify(err))
            if (err) {
                return res.json({
                    error: err
                })
            }
            return res.json({
                model: user
            });
        })(req, res, next);
    })




module.exports = router;