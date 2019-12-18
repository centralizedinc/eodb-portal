"use strict";

const router = require("express").Router();

var dao = require('../dao/SettingsDao');

router
    .route('/')
    .get((req, res) => {
        dao.getSettings()
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        dao.addSettings(req.body)
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/:id')
    .get((req, res) => {
        dao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        dao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router;