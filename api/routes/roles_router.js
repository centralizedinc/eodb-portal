"use strict"
const router = require("express").Router();

var RoleDao = require('../dao/RoleDao');

router.route('/')
    .get((req, res) => {
        RoleDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        RoleDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/:id')
    .get((req, res) => {
        RoleDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        RoleDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router