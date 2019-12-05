'use strict'

var card_validator = require('card-validator');
var router = require("express").Router();

router.route('/card')
    .post((req, res) => {
        console.log(JSON.stringify(req.body))
        res.json(card_validator.number(req.body.card))
    });

router.route('/cvv')
    .post((req, res) => {
        console.log(JSON.stringify(req.body))
        res.json(card_validator.cvv(req.body.cvv, req.body.max));
    });

router.route('/expiry')
    .post((req, res) => {
        console.log(JSON.stringify(req.body))
        res.json(card_validator.expirationDate(req.body.expiry))
    });


module.exports = router;