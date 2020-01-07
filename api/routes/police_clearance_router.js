"use strict"
const router = require("express").Router();

const PoliceApplicationDao = require('../dao/PoliceApplicationDao');
const PolicePermitDao = require('../dao/PolicePermitDao');

router.route('/')
    .get((req, res) => {
        PoliceApplicationDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        console.log("police application dao: " + JSON.stringify(req.body))
        PoliceApplicationDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })


router.route('/epermit/:police_no')
    .get((req, res) => {
        PolicePermitDao.findOne({ police_no: req.params.police_no })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        PolicePermitDao.modifyOne({ police_no: req.params.police_no }, { epermit_attachment: req.body.attachment })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/:id')
    .get((req, res) => {
        PoliceApplicationDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        PoliceApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

module.exports = router