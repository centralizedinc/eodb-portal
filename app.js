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
// var passport = require('./api/utils/auth');
// app.use(passport.initialize());



// Routers
// ########################################################################
app.use('/auth', require('./api/routes/auth'))
app.use("/permits/business", require('./api/routes/business_permit'));
app.use("/permits", require('./api/routes/permit_router'));
app.use("/accounts", require('./api/routes/account_router'))
app.use("/activities", require('./api/routes/activities_router'))
app.use("/admins", require('./api/routes/admin_account_router'))
app.use("/payments", require('./api/routes/payment_router'))
app.use("/departments/dependencies", require('./api/routes/department_dependencies'));
app.use("/departments", require('./api/routes/department_router'));
app.use("/roles", require('./api/routes/roles_router'));



app.listen(process.env.PORT || 4000, () => {
    console.log(`started at port: ${process.env.PORT || 4000}`)
})