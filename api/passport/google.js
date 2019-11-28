const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// Dao
const AccountDao = require('../dao/AccountDao');

// Utils
const ApplicationSettings = require('../utils/ApplicationSettings');
const jwt = require('jsonwebtoken')

passport.use('google', new GoogleStrategy({
    clientID: ApplicationSettings.getValue("GOOGLE_CLIENT_ID"),
    clientSecret: ApplicationSettings.getValue("GOOGLE_CLIENT_SECRET"),
    callbackURL: ApplicationSettings.getValue("GOOGLE_CALLBACK_URL")
},
    function (google_access_token, refreshToken, profile, done) {
        // done(null, profile);
        signInGoogle(profile, google_access_token)
            .then((result) => {
                console.log('done signing in google');
                done(null, result);
            }).catch((err) => {
                console.log('signing in google err :', err);
                done(err);
            });
    }
));


/**
 * 
 * @param {Object} profile 
 * @param {String} google_access_token 
 */
function signInGoogle(profile, google_access_token) {
    // return Promise.resolve();
    return new Promise((resolve, reject) => {
        var result = {
            is_authenticated: false
        }
        AccountDao.findByGoogleID(profile.id)
            .then((account) => {
                if (!account) {
                    return AccountDao.create({
                        method: 'google',
                        email: profile.emails[0].value,
                        google_id: profile.id,
                        google_access_token,
                        status: 1,
                        avatar: {
                            location: profile.photos[0].value
                        },
                        name: {
                            first: profile.name.givenName,
                            last: profile.name.familyName
                        }
                    })
                }
                else return account
            })
            .then((account) => {
                const session_token = jwt.sign({
                    account_id: account._id,
                    email: account.email,
                    date: new Date()
                }, ApplicationSettings.getValue("JWT_SECRET_TOKEN"))
                result.token = session_token
                return AccountDao.modifyById(account._id, { session_token, google_access_token })
            })
            .then((account) => {
                result.account = account;
                result.is_authenticated = true;
                resolve(result)
            })
            .catch((err) => {
                console.log('err :', err);
                reject(err)
            });
    })
}