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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_66cb3ndj:3uakod32bsvvfek6e1cv4e8839@ds217678.mlab.com:17678/heroku_66cb3ndj"
mongoose.connect(MONGODB_URI, {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true
    })
    .then(() => {
        console.log(`Database connection established.`)
    })
    .catch((err) => {
        console.log(`ERROR in connecting to DB ::: ${err}`)
    })



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