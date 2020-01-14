"use strict"
const router = require("express").Router()

const dao = require('../dao/FeesComputationDao')
const jwt = require('jsonwebtoken');

router.route('/')
    .get((req, res) => {
        dao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        var decoded_data = {}, data = req.body;
        if (req.headers.access_token)
            decoded_data = jwt.decode(req.headers.access_token);
        data.created_by = decoded_data.account_id;
        dao.create(data)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/multiple')
    .post((req, res) => {
        var conditions = req.body;
        dao.find({ $or: conditions })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/:permit_type/:app_type')
    .get((req, res) => {
        dao.findOne({ permit_type: req.params.permit_type, application_type: req.params.app_type })
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
        dao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        var decoded_data = {}, data = req.body;
        if (req.headers.access_token)
            decoded_data = jwt.decode(req.headers.access_token);
        data.modified_by = decoded_data.account_id;
        dao.modifyById(req.params.id, data)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

module.exports = router