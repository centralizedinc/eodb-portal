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
                res.json({ errors })
            });
    })
    .post((req, res) => {
        console.log("Creating Business Permit...")
        console.log('Saving data :', req.body);
        const { data, payment } = req.body;
        var results = {};
        BusinessApplicationDao.create(data)
            .then((result) => {
                console.log('payment result :', result);
                results.application = result;
                payment.application_id = result._id;
                return PaymentDao.create(payment)
            })
            .then((result) => {
                results.payment = result;
                console.log('permit result :', result);
                var details = {
                    application_id: results.application._id,
                    application_type: results.application.application_type,
                    permit: 'business',
                    payment_status: payment.status
                }
                return DocketsDao.create(details)
            })
            .then((result) => {
                results.dockets = result;
                console.log('docket result :', result);
                console.log('results :', results);
                res.json(results);
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/:id')
    .get((req, res) => {
        BusinessApplicationDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        BusinessApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

    router.route('/transactions/:id')
    .get((req, res) => {
        console.log("transactions id data: " + JSON.stringify(req.params.id))
        BusinessApplicationDao.find({owner_details:{email:req.params.id}})
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        BusinessApplicationDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/product')
    .get((req, res) => {
        BusinessPermitDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        BusinessPermitDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/:id')
    .get((req, res) => {
        BusinessPermitDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        BusinessPermitDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router