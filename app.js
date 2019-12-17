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
app.use(bodyParser.urlencoded({
    'extended': 'false'
}));
app.use(serveStatic(__dirname + "/dist"));

// SETUP DB
require('./api/utils/db_connector.js').connect();

// Initialize Passport
var passport = require('./api/utils/auth');
// app.use(cookieSession({
//     name: 'mysession',
//     keys: ['vueauthrandomkey'],
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
app.use(passport.initialize());
// app.use(passport.session());


// Routers
// ########################################################################
app.use('/auth', require('./api/routes/auth'))
app.use("/permits/business", require('./api/routes/business_permit'));
app.use("/permits/police", require('./api/routes/police_clearance_router'));
app.use("/permits/barangay", require('./api/routes/barangay_clearance'));
app.use("/permits/cedula", require('./api/routes/cedula_router'));
app.use("/permits", require('./api/routes/permit_router'));
app.use("/accounts", require('./api/routes/account_router'))
app.use("/activities", require('./api/routes/activities_router'))
app.use("/admins", require('./api/routes/admin_account_router'))
app.use("/admin/auth", require('./api/routes/admin_auth'))
app.use("/payments", require('./api/routes/payment_router'))
app.use("/departments/dependencies", require('./api/routes/department_dependencies'));
app.use("/departments", require('./api/routes/department_router'));
app.use("/roles", require('./api/routes/roles_router'));
app.use("/upload", require('./api/routes/upload_router'));
app.use("/creditcard/validate", require('./api/routes/card_validation_router'));
app.use("/dockets", require('./api/routes/dockets_router'));
app.use("/settings", require('./api/routes/settings_router'));
app.use("/references", require('./api/routes/references_router'));
app.use("/checklists", require('./api/routes/checklist_route'));
app.use("/dashboard", require('./api/routes/dashboard_route'))

// for chai testing
app.get("/test", (req, res) => {
    res.sendStatus(200);
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`started at port: ${process.env.PORT || 4000}`)
})

module.exports = app