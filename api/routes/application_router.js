"use strict"
const router = require("express").Router();

// DAO
const ApplicationDao = require('../dao/ApplicationDao');
const DocketsDao = require('../dao/DocketsDao');
const PaymentDao = require('../dao/PaymentDao');
const DepartmentDao = require('../dao/DepartmentDao');

// Permits
const BusinessPermitDao = require('../dao/BusinessPermitDao');

// Utils
const jwt = require('jsonwebtoken');
const sendgrid = require('../utils/email.js');
const constant_helper = require('../utils/constant_helper');
const ApplicationSettings = require('../utils/ApplicationSettings');

router.route('/')
    .get((req, res) => {
        ApplicationDao.findAll()
            .then((result) => {
                console.log('findAll result :', result);
                res.json(result);
            }).catch((err) => {
                console.log('findAll err :', err);
                res.json({ errors: err });
            });
    })
    .post((req, res) => {
        console.log('Creating Application :', req.body);
        const decoded_data = jwt.decode(req.headers.access_token),
            created_by = decoded_data.account_id,
            user_email = decoded_data.email,
            user_name = decoded_data.name;
        const {
            data,
            payment,
            departments
        } = req.body;
        var results = {};
        data.created_by = created_by;
        data.account_id = created_by;
        // CREATE APPLICATION
        const app_data = {
            application_type: data.application_type,
            details: data,
            account_id: created_by,
            created_by,
            permit_type: data.permit_type
        }
        ApplicationDao.create(app_data)
            .then((result) => {
                console.log('application result :', result);

                // Process Departments
                results.application = result;
                var activities = [];
                console.log('departments :', departments);
                if (departments && departments.length)
                    departments.forEach(v => {
                        activities.push({
                            approver: "",
                            department: v.department,
                            status: 0,
                            date_claimed: null,
                            date_approved: null,
                            date_rejected: null,
                            for_compliance: false
                        })
                    })

                // CREATE DOCKET
                var details = {
                    application_id: results.application._id,
                    application_type: results.application.application_type,
                    permit: data.permit_type,
                    payment_status: payment.mode_of_payment === 'A' ? 'paid' : 'partial',
                    created_by,
                    account_id: created_by,
                    activities
                }
                return DocketsDao.create(details)
            })
            .then((result) => {
                console.log('docket result :', result);
                results.docket = result;

                // Process Payments
                payment.transaction_details.payment_for = data.permit_type;
                payment.transaction_details.application_id = results.application._id;
                payment.transaction_details.reference_no = result.reference_no
                payment.transaction_details.created_by = created_by;
                var payment_actions = [],
                    loopCount = payment.mode_of_payment === 'SA' ? 2 :
                        payment.mode_of_payment === 'Q' ? 4 : 1;
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

                // UPDATE BUSINESS PERMIT
                return ApplicationDao.modifyById(results.application._id, { reference_no: results.docket.reference_no, "details.reference_no": results.docket.reference_no });
            })
            .then((result) => {
                results.application = result;
                console.log('results :', results);

                // SEND NOTIFICATION TO CREATOR
                const substitutions = {
                    name: user_name.first,
                    reference_no: result.reference_no,
                    transaction_no: results.payment.transaction_no,
                    url: `${process.env.VUE_APP_HOME_URL}app/tracker?type=${data.permit_type}&ref_no=${result.reference_no}`
                }
                return sendgrid.sendEmail(user_email, "SUCCESSFUL_APPLICATION_CREATION_TEMPLATE", substitutions)
            })
            .then((result) => {
                console.log('creating application notification result :', result)
                res.json(results);
            }).catch((errors) => {
                console.log('errors :', errors);
                res.json({ errors })
            });
    })

router.route('/reference/:reference_no')
    .get((req, res) => {
        ApplicationDao.findOneByReference(req.params.reference_no)
            .then((result) => {
                console.log('findOneByReference result :', result);
                res.json(result);
            }).catch((err) => {
                console.log('findOneByReference err :', err);
                res.json({ errors: err });
            });
    })

router.route('/:id')
    .get((req, res) => {
        ApplicationDao.findOneByID(req.params.id)
            .then((result) => {
                console.log('findOneByID result :', result);
                res.json(result);
            }).catch((err) => {
                console.log('findOneByID err :', err);
                res.json({ errors: err });
            });
    })
    .post((req, res) => {
        ApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                console.log('modifyById result :', result);
                res.json(result);
            }).catch((err) => {
                console.log('modifyById err :', err);
                res.json({ errors: err });
            });
    })

module.exports = router