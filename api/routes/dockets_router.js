"use strict"
const router = require("express").Router();

var DocketsDao = require('../dao/DocketsDao');
var BussinessApplicationDao = require('../dao/BusinessApplicationDao')
var DocketsActivityDao = require('../dao/DocketsActivityDao');

const jwt = require('jsonwebtoken');

router.route('/')
    .get((req, res) => {
        const created_by = jwt.decode(req.headers.access_token).account_id;
        DocketsDao.find({ created_by })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        DocketsDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/unassign')
    .get((req, res) => {
        const { department } = req.query;
        if (!department) return res.json({ errors: "Invalid Query. `department` is required." })
        DocketsDao.find({
            "activities.department": department,
            "activities.date_claimed": null
        }).then((results) => {
            console.log('unassign results :', results);
            res.json(results)
        }).catch((err) => {
            console.log('unassign err :', err);
            res.json({ errors: err })
        });
    })

router.route('/outbox')
    .get((req, res) => {
        const { department } = req.query;
        if (!department) return res.json({ errors: "Invalid Query. `department` is required." })
        DocketsDao.find({
            "activities.department": department,
            $or: [
                { "activities.date_approved": { $ne: null } }, 
                { "activities.date_rejected": { $ne: null } }
            ]
        }).then((results) => {
            console.log('outbox results :', results);
            res.json(results)
        }).catch((err) => {
            console.log('outbox err :', err);
            res.json({ errors: err })
        });
    })

router.route('/claim')
    .get((req, res) => {
        const { department } = req.query;
        if (!department) return res.json({ errors: "Invalid Query. `department` is required." })
        var account_id = jwt.decode(req.headers.access_token).account_id;
        DocketsDao.find({
            "activities.department": department,
            "activities.date_claimed": {
                $ne: null
            },
            "activities.approver": account_id
        }).then((results) => {
            console.log('claim results :', results);
            res.json(results)
        }).catch((err) => {
            console.log('claim err :', err);
            res.json({ errors: err })
        });
    })
    .post((req, res) => {
        var { docket_reference, approver, department, remarks } = req.body, results = {};
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            approver, department, remarks, date_claimed: new Date()
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    action: "claim",
                    remarks,
                    date_created: new Date()
                }
                return DocketsActivityDao.create(docket_activity)
            })
            .then((result) => {
                results.activity = result;
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/approve')
    .post((req, res) => {
        var { docket_reference, approver, department, remarks } = req.body, results = {};
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            approver, department, remarks, date_approved: new Date()
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    status: "approve",
                    remarks,
                    date_created: new Date()
                }
                return DocketsActivityDao.create(docket_activity)
            })
            .then((result) => {
                results.activity = result;
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/reject')
    .post((req, res) => {
        var { docket_reference, approver, department, remarks } = req.body, results = {};
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            approver, department, remarks, date_rejected: new Date()
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    status: "reject",
                    remarks,
                    date_created: new Date()
                }
                return DocketsActivityDao.create(docket_activity)
            })
            .then((result) => {
                results.activity = result;
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/compliance')
    .post((req, res) => {
        var { docket_reference, approver, department, remarks } = req.body, results = {};
        DocketsDao.modifyOne({ reference_no: docket_reference }, { status: 3 })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    status: "compliance",
                    remarks,
                    date_created: new Date()
                }
                return DocketsActivityDao.create(docket_activity)
            })
            .then((result) => {
                results.activity = result;
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/:id')
    .get((req, res) => {
        DocketsDao.findOneByID(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        DocketsDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/applications/business/:ref_no')
    .get((req, res) => {
        BussinessApplicationDao.findOneByReference(req.params.ref_no)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        DocketsDao.modifyById(req.params.id, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router