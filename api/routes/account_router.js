"use strict"
const router = require("express").Router();

var AccountDao = require('../dao/AccountDao');
const jwt = require('jsonwebtoken');

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

router.route('/profile')
    .post((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;
        console.log('account_id :', account_id);
        console.log('req.body :', req.body);
        AccountDao.modifyById(account_id, req.body)
            .then((account) => {
                account.password = null;
                res.json(account);
            }).catch((err) => {
                res.json({ errors: err });
            });
    })

router.route('/password/:id')
    .post((req, res) => {
        AccountDao.changePassword(req.params.id, req.body)
        .then((account) => {
            account.password = null;
            res.json(account);
        }).catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
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