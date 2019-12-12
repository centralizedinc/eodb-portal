"use strict"
const router = require("express").Router

const BaranggayApplicationDao = require('../dao/BarangayApplicationDao')
const DocketsDao = require('../dao/DocketsDao');
const PaymentDao = require('../dao/PaymentDao');

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