"use strict"
const router = require("express").Router()

const BaranggayApplicationDao = require('../dao/BarangayApplicationDao');
const BarangayPermitDao = require('../dao/BarangayPermitDao');

router.route('/')
    .get((req, res) => {
        BaranggayApplicationDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        BaranggayApplicationDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/epermit/:barangay_no')
    .get((req, res) => {
        BarangayPermitDao.findOne({ barangay_no: req.params.barangay_no })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        BarangayPermitDao.modifyOne({ barangay_no: req.params.barangay_no }, { epermit_attachment: req.body.attachment })
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
        BaranggayApplicationDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        BaranggayApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

module.exports = router