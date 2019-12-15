"use strict"
const router = require("express").Router();

var DocketsDao = require('../dao/DocketsDao');
var BussinessApplicationDao = require('../dao/BusinessApplicationDao');
var DocketsActivityDao = require('../dao/DocketsActivityDao');
var BusinessPermitDao = require('../dao/BusinessPermitDao');
var AccountDao = require('../dao/AccountDao');

const jwt = require('jsonwebtoken');
const sendgrid = require('../utils/email');

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

                // Check if last approver
                const approver = results.docket.activities.find(v => v.department === department);
                if (approver.last_approver) return processApprovedApplication(docket_reference);
            })
            .then((result) => {
                if (result) console.log('approved application result :', result);
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

/**
 * @returns {Promise}
 * @param {String} reference_no 
 */
function processApprovedApplication(reference_no) {
    return new Promise((resolve, reject) => {
        var results = {};
        // Update Docket
        DocketsDao.modifyOne({ reference_no }, { status: 1 })
            .then((result) => {
                results.docket = result;
                // Update Application
                return BussinessApplicationDao.modifyOne({ reference_no }, { status: 1 });
            })
            .then((application) => {
                results.application = application;
                // Create Permit
                return BusinessPermitDao.create(application);
            })
            .then((permit) => {
                results.permit = permit;

                // Find the user
                return AccountDao.findOneByID(permit.account_id);
            })
            .then((user) => {
                // Send Email Notifiation
                const substitutions = {
                    name: user.name.first,
                    reference_no
                }
                return sendgrid.sendEmail(user.email, "APPROVE_APP_NOTIFICATION", substitutions)
            })
            .then((result) => {

                console.log('processApprovedApplication results :', results);
                resolve(results)
            })
            .catch((err) => {
                console.log('processApprovedApplication err :', err);
                reject(err);
            });
    })
}

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

                // Check if last approver
                const approver = results.docket.activities.find(v => v.department === department);
                if (approver.last_approver) return processRejectedApplication(docket_reference);
            })
            .then((result) => {
                if (result) console.log('rejected application result :', result);
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

/**
 * @returns {Promise}
 * @param {String} reference_no 
 */
function processRejectedApplication(reference_no) {
    return new Promise((resolve, reject) => {
        var results = {};
        // Update Docket
        DocketsDao.modifyOne({ reference_no }, { status: 2 })
            .then((result) => {
                results.docket = result;
                // Update Application
                return BussinessApplicationDao.modifyOne({ reference_no }, { status: 2 });
            })
            .then((application) => {
                results.application = application;

                // Find the user
                return AccountDao.findOneByID(permit.account_id);
            })
            .then((user) => {
                // Send Email Notifiation
                const substitutions = {
                    name: user.name.first,
                    reference_no
                }
                return sendgrid.sendEmail(user.email, "REJECT_APP_NOTIFICATION", substitutions)
            })
            .then((result) => {

                console.log('processRejectedApplication results :', results);
                resolve(results)
            })
            .catch((err) => {
                console.log('processRejectedApplication err :', err);
                reject(err);
            });
    })
}

router.route('/compliance')
    .post((req, res) => {
        var { docket_reference, approver, department, remarks } = req.body, results = {};
        BussinessApplicationDao.modifyOne({ reference_no: docket_reference }, { status: 3 })
            .then((result) => {
                results.application = result;

                return DocketsDao.modifyOne({ reference_no: docket_reference }, { status: 3 });
            })
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

// router.route('/compliance/response')
//     .post((req, res) => {
        
//     })

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