"use strict"
const router = require("express").Router()

const CedulaApplicationDao = require('../dao/CedulaApplicationDao');
const CedulaPermitDao = require('../dao/CedulaPermitDao');

router.route('/')
    .get((req, res) => {
        CedulaApplicationDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        CedulaApplicationDao.create(req.body)
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
        CedulaApplicationDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        CedulaApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/epermit/:cedula_no')
    .get((req, res) => {
        CedulaPermitDao.findOne({ cedula_no: req.params.cedula_no })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        CedulaPermitDao.modifyOne({ cedula_no: req.params.cedula_no }, { epermit_attachment: req.body })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

module.exports = router