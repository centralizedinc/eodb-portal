const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const serveStatic = require('serve-static');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();

//application server
const app = express()

Object.keys(process.env).forEach(key => {
    if (key.indexOf('VUE_APP') > -1) console.log(`${key} :`, process.env[key]);
})


app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(serveStatic(__dirname + "/dist"));
app.use('/auth', require('./api/routes/auth'))

// SETUP DB
require('./api/utils/db_connector.js').connect();

// Initialize Passport
var passport = require('./api/utils/auth');
app.use(passport.initialize());


app.listen(process.env.PORT || 4000, () => {
    console.log(`started at port: ${process.env.PORT || 4000}`)
})

// Routers
// ########################################################################
app.use("/permit", require('./api/routes/permit_router'));