"use strict"
const router = require("express").Router();

const BusinessApplicationDao = require('../dao/BusinessApplicationDao');
const BusinessPermitDao = require('../dao/BusinessPermitDao');
const DocketsDao = require('../dao/DocketsDao');
const PaymentDao = require('../dao/PaymentDao');
const DepartmentDao = require('../dao/DepartmentDao');

const jwt = require('jsonwebtoken');
const sendgrid = require('../utils/email.js');
const constant_helper = require('../utils/constant_helper');
const ApplicationSettings = require('../utils/ApplicationSettings');

router.route('/')
    .get((req, res) => {
        const decoded_data = jwt.decode(req.headers.access_token),
            account_id = decoded_data.account_id;
        BusinessPermitDao.find({ account_id })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        const decoded_data = jwt.decode(req.headers.access_token),
            account_id = decoded_data.account_id;
        var details = req.body;
        details.account_id = account_id;
        BusinessPermitDao.create(details)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/application')
    .post((req, res) => {
        console.log('Creating Business Permit :', req.body);
        const decoded_data = jwt.decode(req.headers.access_token),
            created_by = decoded_data.account_id,
            user_email = decoded_data.email,
            user_name = decoded_data.name;
        const {
            data,
            payment
        } = req.body;
        var results = {};
        data.created_by = created_by;
        data.account_id = created_by;
        // CREATE BUSINESS PERMIT
        BusinessApplicationDao.create(data)
            .then((result) => {
                console.log('application result :', result);
                // PROCESS PAYMENTS
                results.application = result;
                payment.transaction_details.payment_for = "business";
                payment.transaction_details.application_id = result._id;
                payment.created_by = created_by;
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
                return DepartmentDao.findAll();
            })
            .then((departments) => {
                var activities = [];
                if (departments) activities = departments.map(v => { return { department: v._id, last_approver: v.last_approver, date_claimed: null, date_approved: null, date_rejected: null } });
                // CREATE DOCKET
                var details = {
                    application_id: results.application._id,
                    application_type: results.application.application_type,
                    permit: 'business',
                    payment_status: payments[0].status,
                    created_by,
                    account_id: created_by,
                    activities
                }
                return DocketsDao.create(details)
            })
            .then((result) => {
                results.dockets = result;
                console.log('docket result :', result);

                // UPDATE BUSINESS PERMIT
                return BusinessApplicationDao.modifyById(results.application._id, { reference_no: result.reference_no });
            })
            .then((result) => {
                results.application = result;
                console.log('results :', results);

                // SEND NOTIFICATION TO CREATOR
                const substitutions = {
                    name: user_name.first,
                    reference_no: result.reference_no,
                    transaction_no: results.payment.transaction_no,
                    url: `${process.env.VUE_APP_HOME_URL}app/tracker?type=business&ref_no=${result.reference_no}`
                }
                return sendgrid.sendEmail(user_email, "SUCCESSFUL_APPLICATION_CREATION_TEMPLATE", substitutions)
            })
            .then((result) => {
                console.log('creating business notification result :', result)
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


router.route('/application/reference/:reference_no')
    .get((req, res) => {
        const reference_no = req.params.reference_no;
        console.log('reference_no :', reference_no);
        BusinessApplicationDao.findOneByReference(reference_no)
            .then((result) => {
                console.log('result :', result);
                if (!result) res.json({ errors: { message: "Invalid Reference Number" } })
                res.json(result);
            }).catch((err) => {
                console.log('err :', err);
                res.json({ errors: err });
            });
    })

module.exports = router