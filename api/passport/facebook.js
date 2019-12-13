const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Dao
const AccountDao = require('../dao/AccountDao');

// Utils
const ApplicationSettings = require('../utils/ApplicationSettings');
const jwt = require('jsonwebtoken');


passport.use(new FacebookStrategy({
    clientID: ApplicationSettings.getValue("FACEBOOK_CLIENT_ID"),
    clientSecret: ApplicationSettings.getValue("FACEBOOK_CLIENT_SECRET"),
    callbackURL: ApplicationSettings.getValue("FACEBOOK_CALLBACK_URL"),
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'first_name', 'last_name', 'middle_name']
},
    function (facebook_access_token, refreshToken, profile, done) {
        console.log("facebook first token: " + JSON.stringify(facebook_access_token))
        console.log("facebook profile data: " + JSON.stringify(profile))

        // done(null, profile)
        signInFacebook(profile, facebook_access_token)
            .then((result) => {
                console.log('done signing in facebook');
                done(null, result);
            }).catch((err) => {
                console.log('signing in facebook err :', err);
                done(err);
            });
    }
));

/**
 * 
 * @param {Object} profile 
 * @param {String} facebook_access_token 
 */
function signInFacebook(profile, facebook_access_token) {
    // return Promise.resolve();
    console.log("sign in facebook access token: " + JSON.stringify(facebook_access_token))
    return new Promise((resolve, reject) => {
        var result = {
            is_authenticated: false
        }
        AccountDao.findByFacebookID(profile.id)
            .then((account) => {
                console.log("find by facebook id account data: " + JSON.stringify(account))
                if (!account) {
                    result.new_account = true;
                    return AccountDao.create({
                        method: 'facebook',
                        email: profile.emails[0].value,
                        facebook_id: profile.id,
                        facebook_access_token,
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
                console.log("#####account: " + JSON.stringify(account))
                const session_token = jwt.sign({
                    account_id: account._id,
                    email: account.email,
                    name: account.name,
                    date: new Date()
                }, ApplicationSettings.getValue("JWT_SECRET_TOKEN"))
                result.token = session_token
                return AccountDao.modifyById(account._id, { session_token, facebook_access_token })
            })
            .then((account) => {
                console.log("######modify by id acount dao: " + JSON.stringify(account))
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