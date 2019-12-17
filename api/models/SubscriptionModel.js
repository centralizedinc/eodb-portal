var mongoose = require('mongoose');

var model = new mongoose.Schema({
    date_created:{
        type:Date,
        default:new Date()
    },
    account_id:String,
    subscription:{},
    active:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('subscription', model)