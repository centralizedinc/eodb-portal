"use strict";

const router = require("express").Router();

var SettingsDao = require('../dao/SettingsDao');

router
    .route('/')
    .get((req, res) => {
        SettingsDao.getSettings()
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        SettingsDao.addSettings(req.body)
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router;