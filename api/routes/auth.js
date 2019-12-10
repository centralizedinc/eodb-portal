const email_helper = require('../utils/email');
// const router = require('express').Router();
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// passport.use(new FacebookStrategy({
//     clientID: process.env.VUE_APP_FACEBOOK_CLIENT_ID || '698051237370260',
//     clientSecret: process.env.VUE_APP_FACEBOOK_CLIENT_SECRET || 'e19575d956bdf952cd04351e8c7c3bce',
//     callbackURL: `${process.env.VUE_APP_BASE_API_URI}/auth/facebook/callback`,
//     enableProof: true,
//     profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'first_name', 'last_name', 'middle_name']
// },
//     function (facebook_access_token, refreshToken, profile, done) {
//         done(null, { profile, facebook_access_token });
//     }
// ));

// passport.use('google', new GoogleStrategy({
//     clientID: process.env.VUE_APP_GOOGLE_CLIENT_ID || '271549267606-fd6h2lphs0lft2ldg7m22mufau4lo9jq.apps.googleusercontent.com',
//     clientSecret: process.env.VUE_APP_GOOGLE_CLIENT_SECRET || 'ZpwIOSXOLx7hfVn1RCTUbpXR',
//     callbackURL: `${process.env.VUE_APP_BASE_API_URI}/auth/google/callback`
// },
//     function (google_access_token, refreshToken, profile, done) {
//         console.log('accessToken :', google_access_token);
//         console.log('refreshToken :', refreshToken);
//         console.log('profile :', profile);
//         done(null, { profile, google_access_token });
//     }
// ));




// router.route('/facebook')
//     .get(passport.authenticate('facebook', { scope: ["email"] }));

// router.route('/facebook/callback')
//     .get(passport.authenticate('facebook', {session: false}),(req, res) => {
//         res.redirect(`${process.env.VUE_APP_HOME_URI}auth?oauth=facebook&data=${new Buffer(JSON.stringify(req.user)).toString('base64')}`)
//     });

// router.route('/google')
//     .get(passport.authenticate('google', {
//         scope: ['profile', 'email']
//     }));

// router.route('/google/callback')
//     .get(passport.authenticate('google', {session: false}), (req, res) => {
//         res.redirect(`${process.env.VUE_APP_HOME_URI}auth?oauth=google&data=${new Buffer(JSON.stringify(req.user)).toString('base64')}`)
//     });

// module.exports = router;


"use strict";

const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Dao
const AccountDao = require('../dao/AccountDao');

// Utils
const constant_helper = require('../utils/constant_helper');

router.route('/login')
    .post(function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            console.log("passport login auth user: " + JSON.stringify(user))
            console.log("passport login auth err: " + JSON.stringify(err))
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


router
    .route('/signup')
    .post(function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            console.log("passport signup auth user: " + JSON.stringify(user))
            console.log("passport signup auth err: " + JSON.stringify(err))
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

router.route('/invitation')
    .post((req, res) => {
        const { email, name, tin, sender } = req.body;
        email_helper.registerInvitation(email, name, tin, sender)
            .then((model) => res.json({ success: true, model }))
            .catch((errors) => res.json({ success: false, errors }));
    })

router
    .route('/confirmation/setup')
    .get((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;
        AccountDao.modifyById(account_id, {
            status: 2
        })
            .then((model) => res.json({
                message: constant_helper.confirmation_success,
                model
            }))
            .catch((error) => res.json({
                error
            }));
    })

router
    .route('/confirmation/:code')
    .get((req, res) => {
        const retrieved_data = new Buffer(req.params.code, "base64").toString();
        var data = null;
        try {
            data = JSON.parse(retrieved_data);
        } catch (error) {
            return res.json({
                error: {
                    message: constant_helper.invalid_code
                }
            })
        }
        console.log('confirmation data :', data);
        if (data) {
            const {
                account_id,
                expiry_date,
                date
            } = data;
            if (new Date(expiry_date).getTime() < new Date().getTime()) {
                return res.json({
                    error: {
                        message: constant_helper.confirmation_expired
                    }
                })
            }

            AccountDao.modifyById(account_id, {
                status: 1,
                confirmation_url: null
            })
                .then((model) => res.json({
                    message: constant_helper.confirmation_success,
                    model
                }))
                .catch((error) => res.json({
                    error
                }));
        }
    })

/***** SIGN UP USING GOOGLE ACCOUNT *****/
router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.route('/google/callback')
    .get(passport.authenticate('google', {
        session: false
    }), (req, res) => {
        const code = new Buffer(JSON.stringify(req.user)).toString('base64');
        res.redirect(`${process.env.VUE_APP_HOME_URL}confirmation?platform=google&data=${code}`)
    });

/***** SIGN UP USING FACEBOOK ACCOUNT *****/
router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ["email"]
    }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        session: false
    }),
        (req, res) => {
            console.log("facebook callback")
            console.log("facebook callback req.user: " + JSON.stringify(req.user))
            const code = new Buffer(JSON.stringify(req.user)).toString('base64');
            console.log("facebook callback code data: " + JSON.stringify(code))
            res.redirect(`${process.env.VUE_APP_HOME_URL}confirmation?platform=facebook&data=${code}`)
        });

module.exports = router;