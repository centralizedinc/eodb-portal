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
        DocketsDao.find()
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

router.route('/inbox')
    .get((req, res) => {
        // const { department } = req.query;
        const { department } = jwt.decode(req.headers.access_token);
        console.log('department :', department);
        if (!department) return res.json({ errors: "Invalid Query. `department` is required." })
        DocketsDao.find({
            status: 0,
            "activities.department": department,
            "activities.date_claimed": null
        }).then((results) => {
            console.log('inbox results :', results);
            res.json(results)
        }).catch((err) => {
            console.log('inbox err :', err);
            res.json({ errors: err })
        });
    })

router.route('/outbox')
    .get((req, res) => {
        // const { department } = req.query;
        const { department, account_id } = jwt.decode(req.headers.access_token);
        if (!department) return res.json({ errors: "Invalid Query. `department` is required." })
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

router.route('/claim')
    .post((req, res) => {
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference } = req.body, results = {}, approver = account_id;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.approver": approver,
            "activities.$.department": department,
            "activities.$.date_claimed": new Date()
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    action: "claim",
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
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference, remarks } = req.body, results = {}, approver = account_id;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.approver": approver,
            "activities.$.department": department,
            "activities.$.remarks": remarks,
            "activities.$.date_approved": new Date()
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    action: "approve",
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
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference, remarks } = req.body, results = {}, approver = account_id;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.approver": approver,
            "activities.$.department": department,
            "activities.$.remarks": remarks,
            "activities.$.date_rejected": new Date()
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    action: "reject",
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
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference, remarks } = req.body, results = {}, approver = account_id;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.for_compliance": true,
            "activities.$.remarks": remarks
        })
            .then((result) => {
                results.docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    action: "compliance",
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

router.route('/compliance/response')
    .post((req, res) => {
        var { docket_reference, department, remarks, attachments } = req.body;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.remarks": remarks,
            "activities.$.for_compliance": false,
            $push: {
                "compliance_attachments": {
                    $each: attachments
                }
            }
        })
            .then((result) => {
                const activity = result.activities.find(v=>v.department === department);
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver: activity.approver,
                    action: "compliance",
                    remarks,
                    date_created: new Date()
                }
                return DocketsActivityDao.create(docket_activity)
            })
            .then((result) => {
                results.activity = result;
                res.json(results)
            })
            .catch((err) => {

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