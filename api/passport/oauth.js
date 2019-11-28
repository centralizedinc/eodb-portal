const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Dao
const AccountDao = require('../dao/AccountDao');

// Utils
const constant_helper = require('../utils/constant_helper');
const jwt = require('jsonwebtoken')
const ApplicationSettings = require('../utils/ApplicationSettings')
const SendEmail = require('../utils/email');

// VALIDATING TOKEN
passport.use(new JWTstrategy({
    secretOrKey: ApplicationSettings.getValue("JWT_SECRET_TOKEN"),
    jwtFromRequest: ExtractJWT.fromHeader('access_token')
}, async (token, done) => {
    try {
        console.log('Token verified');
        return done(null, token);
    } catch (error) {
        console.log(error);
        return done({
            success: false,
            code: "UNAUTHORIZED",
            message: "Invalid Token",
            error
        });
    }
}));


// LOGIN
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    var result = {
        is_authenticated: false
    }
    console.time("login");
    AccountDao.findByEmail(email)
        .then((account_result) => {
            if (!account_result) return done({
                message: constant_helper.invalid_auth
            }, false);
            else if (account_result.status === 0) return done({
                message: constant_helper.confirmation_required
            }, false);
            // Validate Password
            else {
                result.account = account_result;
                return account_result.isValidPassword(password);
            }
        })
        .then((isValid) => {
            if (!isValid) return done({
                message: constant_helper.invalid_auth
            }, false);
            else {
                const token = jwt.sign({
                    account_id: result.account._id,
                    email: email,
                    date: new Date()
                }, ApplicationSettings.getValue("JWT_SECRET_TOKEN"));
                result.token = token;
                return AccountDao.modifyById(result.account._id, {
                    token
                });
            }
        })
        .then((modified_account) => {
            result.account = modified_account;
            result.is_authenticated = true;
            console.timeEnd("login");
            return done(null, result);
        })
        .catch((error) => {
            return done(error)
        })
}))


// SIGNUP
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    const {
        name,
        tin,
        confirm
    } = req.body;
    if (!email) return done({
        message: constant_helper.invalid_email
    });
    if (!password || !confirm || password !== confirm) return done({
        message: constant_helper.invalid_password
    });

    var result = {};
    AccountDao.findByEmail(email)
        .then((existing_account) => {
            if (existing_account) done({
                message: constant_helper.existing_email
            });
            else {
                AccountDao.create({
                        email,
                        password,
                        name
                    })
                    .then((account) => {
                        result.account = account;
                        return SendEmail.registration(email, account.name.first, account._id);
                    })
                    .then((send_email) => {
                        const {
                            confirmation_url,
                            expiry_date
                        } = send_email;
                        result.confirmation = {
                            confirmation_url,
                            expiry_date
                        };
                        return AccountDao.modifyById(result.account._id, {
                            confirmation_url
                        })
                    })
                    .then((account) => {
                        result.account = account;
                        done(null, result);
                    })
                    .catch((err) => done(err));
            }
        }).catch((err) => done(err));
}))