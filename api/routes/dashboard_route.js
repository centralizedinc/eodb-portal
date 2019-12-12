const router = require("express").Router();

const AccountModel = require('../models/AccountModel');
const AdminAccountModel = require('../models/AdminAccountModel');
const TransactionModel = require('../models/DocketModel')


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
              }
        ]).then(result=>{
            res.json(result)
            
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
              }
        ]).then(result=>{
            res.json(result)
            
        })
    })

/**
 * @description COLLECTIONS
 */
   
router.route('/collections/total')
    .get((req, res)=>{
        var total = 0;
        var response = {}
        TransactionModel.countDocuments()        
        .then(result=>{                       
            res.json(result)
        })
    })


module.exports = router