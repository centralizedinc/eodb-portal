"use strict"
const router = require("express").Router();

var AccountDao = require('../dao/AccountDao');

router.route('/')
    .get((req, res) => {
        AccountDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        AccountDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/user/profile/:email')
    .get((req, res) => {
        console.log("test get id: " + JSON.stringify(req))
        // AccountDao.findOneByID()
        AccountDao.findByEmail(req.params.email)
            .then((result) => {
                console.log("find by email result: " + JSON.stringify(result))
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            })
    })

router.route('/:id')
    .get((req, res) => {
        console.log("find one account id by one: " + JSON.stringify(req.params.id))
        var data = req.params.id
        AccountDao.findOne({
                email: data
            })
            .then((result) => {
                console.log("find one by id: " + JSON.stringify(result))
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        AccountDao.modifyOne({
                session_token: req.params.id
            }, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

module.exports = router