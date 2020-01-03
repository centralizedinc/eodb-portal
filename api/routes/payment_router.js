"use strict"
const router = require("express").Router();

var ApplicationSettings = require('../utils/ApplicationSettings');

const axios = require('axios');
const jwt = require('jsonwebtoken');

var PaymentDao = require('../dao/PaymentDao');

router.route('/')
    .get((req, res) => {
        PaymentDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        var { card, payment_details, transaction_details } = req.body;
        getPaymentToken(card)
            .then((result) => {
                payment_details.source = result.data.id;
                return getPaymentCharges(payment_details)
            })
            .then((result) => {
                transaction_details.payment_details = result.data;
                return PaymentDao.create(transaction_details)
            })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json({
                    errors: err
                })
            });
    })


router.route('/client')
    .get((req, res) => {
        const decoded_data = jwt.decode(req.headers.access_token),
            created_by = decoded_data.account_id;
        console.log('decoded_data :', decoded_data);
        PaymentDao.find({ created_by, status: 'paid' })
            // PaymentDao.findAll()
            .then((result) => {
                console.log('result :', result);
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/receipt/:transaction_no')
    .post((req, res) => {
        PaymentDao.modifyOne({ transaction_no: req.params.transaction_no }, { attachment: req.body.attachment })
            // PaymentDao.findAll()
            .then((result) => {
                console.log('result :', result);
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

/**
 * @returns {Promise}
 * @param {Object} card 
 */
function getPaymentToken(card) {
    var card_details = { card };
    return axios({
        method: "post",
        url: ApplicationSettings.getValue('PAYMENT_TOKEN_URL'),
        data: card_details,
        auth: {
            username: ApplicationSettings.getValue('PAYMENT_TOKEN_USERNAME'),
            password: ""
        }
    })
}

/**
 * @returns {Promise}
 * @param {Object} payment_details 
 */
function getPaymentCharges(payment_details) {
    console.log(JSON.stringify(payment_details));

    return axios({
        method: "post",
        url: ApplicationSettings.getValue('PAYMENT_CHARGES_URL'),
        data: payment_details,
        auth: {
            username: ApplicationSettings.getValue('PAYMENT_CHARGES_USERNAME'),
            password: ""
        }
    })
}

router.route('/:id')
    .get((req, res) => {
        PaymentDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        PaymentDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router