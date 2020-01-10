"use strict"
const router = require("express").Router();

var AdminAccountDao = require('../dao/AdminAccountDao');

router.route('/')
    .get((req, res) => {
        AdminAccountDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        AdminAccountDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/password/:id')
    .post((req, res) => {
        AdminAccountDao.changePassword(req.params.id, req.body)
            .then((account) => {
                account.password = null;
                res.json(account);
            }).catch((err) => {
                console.error(err)
                res.sendStatus(500)
            });
    })

router.route('/settings/:id')
    .post((req, res) => {
        AdminAccountDao.updateSettings(req.params.id, req.body)
            .then((account) => {
                account.password = null;
                res.json(account);
            }).catch((err) => {
                console.error(err)
                res.sendStatus(500)
            });
    })

router.route('/:id')
    .get((req, res) => {
        AdminAccountDao.findOneByID(req.params.id)
            .then((result) => {
                result.password = null
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        AdminAccountDao.modifyById(req.params.id, {
            avatar: req.body.avatar,
            name: req.body.name,
            email: req.body.email,
            deparment: req.body.deparment,
            role: req.body.role
        })
            .then((result) => {
                result.password = null
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router