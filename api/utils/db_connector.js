var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')

var SettingsDao = require('../dao/SettingsDao');
var ApplicationSettings = require('./ApplicationSettings');
const sg_email = require('./email');
const uploader = require("./uploader");

function connect(app) {
    mongoose.connect(process.env.MONGODB_URI || require('./constant_helper').mongodb_uri, {
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        })
        .then(() => {
            console.log('connection successful');

            /****** Setup Application Variables ******/
            return SettingsDao.getSettings()
        })
        .then((params) => {
            ApplicationSettings.setApplicationVariables(params)
            console.log('Initialized Application Settings: ' + JSON.stringify(ApplicationSettings.getApplicationVariables()));

            /****** Setup Authentication ******/
            require('../passport/oauth');
            require('../passport/google');
            require('../passport/facebook');
            require('../passport/local');
            sg_email.setKeys();
            uploader.setKeys();
        }).catch((err) => console.error(err));
}

module.exports = {
    connect,
    db: mongoose
}