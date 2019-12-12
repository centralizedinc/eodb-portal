const router = require("express").Router();

const AccountModel = require('../models/AccountModel');
const AdminAccountModel = require('../models/AdminAccountModel');
const TransactionModel = require('../models/DocketModel')
const PaymentModel = require('../models/PaymentModel')


/**
 * @decription details for RegisteredUserCard
 */
router.route('/users')
    .get((req, res)=>{
        var total = 0;
        var response = {}
        AccountModel.aggregate([
            {"$group" : {_id:"$method", count:{$sum:1}}},
        ])
        .then(result=>{
            response.users = result
            return AdminAccountModel.aggregate([
                {'$group':{_id:'$status', count:{$sum:1}}}
            ])
            
        })
        .then(result=>{
            response.admins = result            
            res.json(response)
        })
    })

router.route('/users/total')
    .get((req, res)=>{
        var total = 0;
        AccountModel.countDocuments()
        .then(result=>{
            total += result
            return AdminAccountModel.countDocuments()
            
        })
        .then(result=>{
            total += result           
            res.json(total)
        })
    })

/**
 * @decription details for RegisteredUserCard series
 */
router.route('/users/trend/:filter')
    .get((req, res)=>{
        var filter = {
            month: { $month: "$date_created" },
            day: { $dayOfMonth: "$date_created" },
            year: { $year: "$date_created" }
        }
        if(req.params.filter === '0'){
            delete filter.month
            delete filter.day            
        }else if(req.params.filter === '1'){
            delete filter.day  
        }

        AccountModel.aggregate([
            {
                $group: {
                  _id: filter,
                  count: { $sum: 1 }
                }
              },
              { $sort : { _id : 1 } },
        ]).then(result=>{
            var response = {
                series:result
            }
            if(result[result.length -1] && result[result.length -2]){
                var trend = result[result.length -2].count > result[result.length -1].count?-1:1
                var percent = 0
                if(trend < 0){
                    percent = (((result[result.length -2].count-result[result.length -1].count) / result[result.length -1].count) *100).toFixed(2)
                }else{
                    percent = (((result[result.length -1].count-result[result.length -2].count) / result[result.length -2].count) *100).toFixed(2)
                }
                 
                response.trend = trend
                response.percent = percent
            }
            res.json(response)
            
        })
    })

router.route('/transactions')
    .get((req, res)=>{
        var total = 0;
        var response = {}
        TransactionModel.aggregate([
            {"$group" : {_id:"$status", count:{$sum:1}}},
        ])        
        .then(result=>{                       
            res.json(result)
        })
    })

router.route('/transactions/total')
    .get((req, res)=>{
        var total = 0;
        var response = {}
        TransactionModel.countDocuments()        
        .then(result=>{                       
            res.json(result)
        })
    })

/**
 * @decription 
 */
router.route('/transactions/trend/:filter')
    .get((req, res)=>{
        var filter = {
            month: { $month: "$date_created" },
            day: { $dayOfMonth: "$date_created" },
            year: { $year: "$date_created" }
        }
        if(req.params.filter === '0'){
            delete filter.month
            delete filter.day            
        }else if(req.params.filter === '1'){
            delete filter.day  
        }

        TransactionModel.aggregate([
            {
                $group: {
                  _id: filter,
                  count: { $sum: 1 }
                }
              },
              { $sort : { _id : 1 } },
        ]).then(result=>{
            var response = {
                series:result
            }
            if(result[result.length -1] && result[result.length -2]){
                var trend = result[result.length -2].count > result[result.length -1].count?-1:1
                var percent = 0
                if(trend < 0){
                    percent = ((result[result.length -1].count / result[result.length -1].count) *100).toFixed(2)
                }else{
                    percent = ((result[result.length -2].count / result[result.length -2].count) *100).toFixed(2)
                }
                 
                response.trend = trend
                response.percent = percent
            }
            res.json(response)
            
        })
    })

/**
 * @description COLLECTIONS
 */
   
router.route('/collections/total')
    .get((req, res)=>{
        PaymentModel.aggregate([{ $group:
            { _id : null, sum : { $sum: "$total_payable" } }}])        
        .then(result=>{                       
            res.json(result[0].sum)
        })
    })

router.route('/collections')
    .get((req, res)=>{
        var total = 0;
        var response = {}
        PaymentModel.find()        
        .then(result=>{                       
            res.json(result)
        })
    })

/**
 * @decription 
 */
router.route('/collections/trend/:filter')
    .get((req, res)=>{
        var filter = {
            month: { $month: "$date_created" },
            day: { $dayOfMonth: "$date_created" },
            year: { $year: "$date_created" }
        }
        if(req.params.filter === '0'){
            delete filter.month
            delete filter.day            
        }else if(req.params.filter === '1'){
            delete filter.day  
        }

        PaymentModel.aggregate([
            
            {
                $group: {
                  _id: filter,
                  collection: { $sum: "$total_payable" }
                }
              },
              { $sort : { _id : 1 } },
        ]).then(result=>{
            var response = {
                series:result
            }
            if(result[result.length -1] && result[result.length -2]){
                var trend = result[result.length -2].count > result[result.length -1].count?-1:1
                var percent = 0
                if(trend < 0){
                    percent = (((result[result.length -2].count-result[result.length -1].count) / result[result.length -1].count) *100).toFixed(2)
                }else{
                    percent = (((result[result.length -1].count-result[result.length -2].count) / result[result.length -2].count) *100).toFixed(2)
                }
                 
                response.trend = trend
                response.percent = percent
            }
            console.log(JSON.stringify(response))
            res.json(response)
        })
    })


module.exports = router