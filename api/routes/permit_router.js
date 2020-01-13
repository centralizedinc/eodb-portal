"use strict"
const router = require("express").Router();

var PermitDao = require('../dao/PermitDao');
var BarangayPermitDao = require('../dao/BarangayPermitDao');
var BusinessPermitDao = require('../dao/BusinessPermitDao');
var CedulaPermitDao = require('../dao/CedulaPermitDao');
var PolicePermitDao = require('../dao/PolicePermitDao');

const jwt = require('jsonwebtoken');

router.route('/')
    .get((req, res) => {
        PermitDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        PermitDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/records')
    .get((req, res) => {
        const { account_id } = jwt.decode(req.headers.access_token);
        Promise.all([
            BusinessPermitDao.find({ account_id }),
            BarangayPermitDao.find({ account_id }),
            PolicePermitDao.find({ account_id }),
            CedulaPermitDao.find({ account_id })
        ]).then((results) => {
            var records = results.reduce((items, item) => items.concat(item));
            records.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
            res.json(records);
        }).catch((err) => {
            res.json({ errors })
        });
    })

router.route('/:id')
    .get((req, res) => {
        PermitDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        PermitDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/checklist/department')
    .get((req, res) => {
        const department = jwt.decode(req.headers.access_token).department;
        console.log('###checklist department :', department)
        PermitDao.find({ "approvers.department": department })
            .then((permits) => {
                console.log("###permits ;", permits)
                var results = [];
                permits.forEach(permit => {
                    results.push({
                        permit_type: permit.keyword,
                        checklist: permit.checklists.filter(v => v.department === department)
                    })
                })
                console.log("#results checklist :", results)
                res.json(results);
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router