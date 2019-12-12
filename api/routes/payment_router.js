"use strict"
const router = require("express").Router();

var ApplicationSettings = require('../utils/ApplicationSettings');

const axios = require('axios');

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
    // request({
    //     method: "POST",
    //     url: ApplicationSettings.getValue('PAYMENT_TOKEN_URL'),
    //     // url: "https://api.magpie.im/v1/tokens",
    //     auth: {
    //         // username: "pk_live_gVCdhumg9FRcpgxjTGSlqw",
    //         // username: "pk_test_NoM3tpGyp2VPwySywrM8zQ",
    //         username: ApplicationSettings.getValue('PAYMENT_TOKEN_USERNAME'),
    //         password: ""
    //     },
    //     json: card_details
    // },
    //     (err, response, body) => {
    //         console.log(err)
    //         console.log("########## reponse: " + JSON.stringify(response));
    //         cb(err || response.body.error, response.body.id);
    //     })
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
    // request({
    //     // url: "https://api.magpie.im/v1/charges",
    //     url: ApplicationSettings.getValue('PAYMENT_CHARGES_URL'),
    //     method: "POST",
    //     auth: {
    //         // username: "sk_live_9wdShdjegw2QvVXZexinIw",
    //         // username: "sk_test_0AHS75l4Dbgm2E2MqysooQ",
    //         username: ApplicationSettings.getValue('PAYMENT_CHARGES_USERNAME'), password: ""
    //     },
    //     json: payment_details
    // },
    //     (err, response, body) => {
    //         console.log("########## charge reponse: " + JSON.stringify(response.body));
    //         cb(err, response.body);
    //     })
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