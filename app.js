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

// SETUP DB
require('./api/utils/db_connector.js').connect();

// Initialize Passport
var passport = require('./api/utils/auth');
app.use(passport.initialize());



// Routers
// ########################################################################
app.use('/auth', require('./api/routes/auth'))
app.use("/permit", require('./api/routes/permit_router'));
app.use("/account", require('./api/routes/account_router'))
app.use("/activities", require('./api/routes/activities_router'))
app.use("/admin", require('./api/routes/admin_account_router'))
app.use("/payment", require('./api/routes/payment_router'))
app.use("/task", require('./api/routes/task_router'))
app.use("/workflow", require('./api/routes/task_workflow_router'))
app.listen(process.env.PORT || 4000, () => {
    console.log(`started at port: ${process.env.PORT || 4000}`)
})