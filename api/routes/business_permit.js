"use strict"
const router = require("express").Router();

const BusinessApplicationDao = require('../dao/BusinessApplicationDao');
const BusinessPermitDao = require('../dao/BusinessPermitDao');
const DocketsDao = require('../dao/DocketsDao');
const PaymentDao = require('../dao/PaymentDao');

router.route('/')
    .get((req, res) => {
        BusinessApplicationDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        console.log("Creating Business Permit...")
        console.log('Saving data :', req.body);
        const {
            data,
            payment
        } = req.body;
        var results = {};
        BusinessApplicationDao.create(data)
            .then((result) => {
                console.log('application result :', result);
                results.application = result;
                payment.transaction_details.payment_for = "business";
                payment.transaction_details.application_id = result._id;
                var payment_actions = [], loopCount = payment.mode_of_payment === 'SA' ? 2 : payment.mode_of_payment === 'Q' ? 4 : 1;
                for (let i = 0; i < loopCount; i++) {
                    if (i === 0) { //paid on first
                        payment.transaction_details.status = 'paid';
                        payment.transaction_details.due_date = new Date();
                        if (payment.method === 'creditcard') {
                            payment_actions.push(PaymentDao.payUsingCreditCard(payment.card, { amount: payment.transaction_details.amount_paid, currency: "php" }, payment.transaction_details));
                        }

                    } else {
                        var unpaid_transaction = JSON.parse(JSON.stringify(payment.transaction_details));
                        unpaid_transaction.status = 'unpaid';
                        var due_date = loopCount === 2 ?
                            new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()) :
                            loopCount === 4 ? new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate()) :
                                new Date();
                        unpaid_transaction.due_date = due_date;
                        unpaid_transaction.method = '';
                        unpaid_transaction.due_date = null;
                        payment_actions.push(PaymentDao.create(unpaid_transaction))
                    }
                }
                if (payment_actions && payment_actions.length) return Promise.all(payment_actions);
            })
            .then((payments) => {
                console.log('payments results :', payments);
                results.payment = payments[0];
                var details = {
                    application_id: results.application._id,
                    application_type: results.application.application_type,
                    permit: 'business',
                    payment_status: payments[0].status
                }
                return DocketsDao.create(details)
            })
            .then((result) => {
                results.dockets = result;
                console.log('docket result :', result);
                return BusinessApplicationDao.modifyById(results.application._id, { reference_no: result.reference_no });
            })
            .then((result) => {
                results.application = result;
                console.log('results :', results);
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors })
            });
    })

router.route('/:id')
    .get((req, res) => {
        BusinessApplicationDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        BusinessApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/transactions/:id')
    .get((req, res) => {
        console.log("transactions id data: " + JSON.stringify(req.params.id))
        BusinessApplicationDao.find({ owner_details: { email: req.params.id } })
            .then((result) => {
                console.log("transaction find result data:" + JSON.stringify(result))
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        BusinessApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/product')
    .get((req, res) => {
        BusinessPermitDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        BusinessPermitDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })


module.exports = router