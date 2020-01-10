"use strict"
const router = require("express").Router();

var DocketsDao = require('../dao/DocketsDao');
var DocketsActivityDao = require('../dao/DocketsActivityDao');
var BusinessPermitDao = require('../dao/BusinessPermitDao');
var PolicePermitDao = require('../dao/PolicePermitDao');
var BarangayPermitDao = require('../dao/BarangayPermitDao');
var CedulaPermitDao = require('../dao/CedulaPermitDao');
var AccountDao = require('../dao/AccountDao');
var ApplicationDao = require('../dao/ApplicationDao');
var PaymentDao = require('../dao/PaymentDao');

const jwt = require('jsonwebtoken');
const sendgrid = require('../utils/email');
const axios = require('axios');

router.route('/')
    .get((req, res) => {
        const { account_id } = jwt.decode(req.headers.access_token);
        DocketsDao.find({ account_id })
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

router.route('/activities')
    .get((req, res) => {
        const { account_id } = jwt.decode(req.headers.access_token);
        DocketsDao.find({ account_id })
            .then((results) => {
                const references = results.map(v => {
                    return { reference_no: v.reference_no }
                });
                return DocketsActivityDao.find({ $or: references })
            })
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
            activities: {
                $elemMatch: {
                    department,
                    date_claimed: null
                }
            }
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
            activities: {
                $elemMatch: {
                    department,
                    date_claimed: {
                        $ne: null
                    },
                    approver: account_id
                }
            }
        }).then((results) => {
            console.log('outbox results :', results);
            res.json(results)
        }).catch((err) => {
            console.log('outbox err :', err);
            res.json({ errors: err })
        });
    })

router.route('/claim')
    .post((req, res) => {
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference } = req.body, docket = {}, approver = account_id;
        console.log('docket_reference :', docket_reference);
        console.log('department :', department);
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.approver": approver,
            "activities.$.date_claimed": new Date()
        })
            .then((result) => {
                console.log('claim result :', docket);
                docket = result;
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
                console.log('claim docket_activity results :', result);
                res.json(docket)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/unclaim')
    .post((req, res) => {
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference } = req.body, docket = {}, approver = account_id;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.approver": null,
            "activities.$.date_claimed": null
        })
            .then((result) => {
                console.log('unclaim result :', result);
                docket = result;
                const docket_activity = {
                    reference_no: result.reference_no,
                    application_id: result.application_id,
                    department,
                    approver,
                    action: "unclaim",
                    date_created: new Date()
                }
                return DocketsActivityDao.create(docket_activity)
            })
            .then((result) => {
                console.log('unclaim docket_activity results :', result);
                res.json(docket)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/approve')
    .post((req, res) => {
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference, remarks, department_title } = req.body, results = {}, approver = account_id;
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.status": 1,
            "activities.$.remarks": remarks,
            "activities.$.date_approved": new Date()
        })
            .then((result) => {
                console.log('DocketsDao result :', result);
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
                results.docket_activity = result;
                console.log('DocketsActivityDao result :', result);
                // Check if last approver
                const activity_index = results.docket.activities.findIndex(v => v.status === 0);
                console.log('check if last approver :', activity_index);
                if (activity_index === -1) {
                    const activity_rejected_index = results.docket.activities.findIndex(v => v.status === 2);
                    console.log('check if rejected :', activity_rejected_index);
                    if (activity_rejected_index === -1) return processApprovedApplication(docket_reference);
                    else if (activity_rejected_index > -1) return processRejectedApplication(docket_reference);
                }
            })
            .then((result) => {
                results.permit = result
                console.log('evaluated application result :', result);
                console.log('process.env.VUE_APP_BASE_API_URI :', process.env.VUE_APP_BASE_API_URI);

                const notification_message = {
                    title: `Your ${getPermitType(results.docket.permit)} Application has been approved.`,
                    message: `Application with reference #${results.docket.reference_no} has been approved by ${department_title}.`
                }
                console.log('notification_message :', notification_message);
                return axios.post(`${process.env.VUE_APP_BASE_API_URI}/subscriptions/notify/${results.docket.account_id}`, notification_message)
                // return axios.post(`http://192.168.1.134:4000/subscriptions/notify/${results.docket.account_id}`, notification_message)
            })
            .then((result) => {
                console.log('notification result :', result);
                console.log('results :', results);
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
    console.log("Process approve application...");
    return new Promise((resolve, reject) => {
        var results = {
            is_approve: true
        };

        DocketsDao.modifyOne({ reference_no }, { status: 1, date_approved: new Date() })
            // Update Docket
            .then((result) => {
                results.docket = result;
                return ApplicationDao.findOneByReference(reference_no);
            })
            // Update Application
            .then((application) => {
                results.application = application;
                if (application.permit_type === "business") return BusinessPermitDao.create(application.details);
                else if (application.permit_type === "police") return PolicePermitDao.create(application.details);
                else if (application.permit_type === "barangay") {
                    var promises = []
                    if (application.details.purpose.includes('pc')) {
                        application.details.barangay_type = "residential";
                        promises.push(BarangayPermitDao.create(application.details));
                    }
                    if (application.details.purpose.includes('bp')) {
                        application.details.barangay_type = "business";
                        promises.push(BarangayPermitDao.create(application.details));
                    }
                    return Promise.all(promises);
                }
                else if (application.permit_type === "cedula") return CedulaPermitDao.create(application.details);
            })
            // Create Permit based on permit type
            .then((permit) => {
                results.details = permit;
                return PaymentDao.findOne({ reference_no: results.application.reference_no })
            })
            // GET FIRST PAYMENT
            .then((payments) => {
                results.payments = payments;
                return AccountDao.findOneByID(results.application.account_id);
            })
            // Find the user
            .then((user) => {
                // GET PERMIT CLASSIFICATION
                const permit_classification =
                    results.application.permit_type === "business" ? "Business" :
                        results.application.permit_type === "cedula" ? "Community Tax Certificate" :
                            results.application.permit_type === "barangay" ? "Barangay" :
                                results.application.permit_type === "police" ? "Police" : "";

                const substitutions = {
                    name: user.name.first,
                    reference_no,
                    permit_classification,
                    date: new Date(),
                    link: `${process.env.VUE_APP_HOME_URL}app/permits?ref_no=${reference_no}`
                }
                return sendgrid.sendEmail(user.email, "APPROVE_APP_NOTIFICATION", substitutions)
            })
            // Send Email Notification
            .then((result) => {
                console.log('sendgrid result :', result);
                console.log('processApprovedApplication results :', results);

                // check if business and has a lack documents
                if (results.application.permit_type === "business" &&
                    results.application.details.lack_documents &&
                    results.application.details.lack_documents.length) {
                    var promises = [];
                    results.application.details.lack_documents.forEach(doc => {
                        promises.push(createOtherPermit(doc, results.application))
                    })
                    return Promise.all(promises);
                }
            })
            .then(result => {
                resolve(results)
            })
            .catch((err) => {
                console.log('processApprovedApplication err :', err);
                reject(err);
            });
    })
}

function createOtherPermit(type, application) {
    if (type === "police") {
        const application_details = {
            reference_no: application.reference_no,
            account_id: application.account_id,
            application_type: 0,
            personal_details: {
                name: application.details.owner_details.name,
                birthdate: application.details.owner_details.birthdate,
                birthplace: application.details.owner_details.birthplace,
                icr_no: application.details.owner_details.icr_no,
                gender: application.details.owner_details.gender,
                civil_status: application.details.owner_details.civil_status,
                height: application.details.owner_details.height,
                weight: application.details.owner_details.weight,
                blood_type: application.details.owner_details.blood_type,
                complexion: application.details.owner_details.complexion,
                educational_attainment: application.details.owner_details.educational_attainment,
                occupation: application.details.owner_details.occupation,
                ctc_no: application.details.owner_details.ctc_no
            },
            address_details: application.details.owner_address,
            contact_details: {
                tel_no: application.details.owner_details.tel_no,
                mobile: application.details.owner_details.mobile,
                email: application.details.owner_details.email
            }
        }
        return PolicePermitDao.create(application_details);
    }
    else if (type === "barangay") {
        const application_details = {
            reference_no: application.reference_no,
            account_id: application.account_id,
            application_type: 0,
            barangay_type: "business"
        }
        return BarangayPermitDao.create(application_details);
    }
    else if (type === "cedula") {
        const application_details = {
            reference_no: application.reference_no,
            account_id: application.account_id,
            application_type: 0,
            personal_details: {
                name: application.details.owner_details.name,
                birthdate: application.details.owner_details.birthdate,
                birthplace: application.details.owner_details.birthplace,
                icr_no: application.details.owner_details.icr_no,
                gender: application.details.owner_details.gender,
                civil_status: application.details.owner_details.civil_status,
                height: application.details.owner_details.height,
                weight: application.details.owner_details.weight,
                occupation: application.details.owner_details.occupation,
                tin: application.details.owner_details.tin
            },
            tax: {
                taxable: {
                    basic: application.details.owner_details.basic_community_tax
                }
            }
        }
        return CedulaPermitDao.create(application_details);
    }
}

router.route('/reject')
    .post((req, res) => {
        const { department, account_id } = jwt.decode(req.headers.access_token);
        var { docket_reference, remarks, department_title } = req.body, results = {}, approver = account_id;
        console.log(`Rejecting application with reference #${docket_reference}`);
        DocketsDao.modifyOne({
            reference_no: docket_reference,
            "activities.department": department
        }, {
            "activities.$.status": 2,
            "activities.$.remarks": remarks,
            "activities.$.date_rejected": new Date()
        })
            .then((result) => {
                console.log('DocketsDao result :', result);
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
                results.docket_activity = result;
                console.log('DocketsActivityDao result :', result);
                // Check if last approver
                const activity_index = results.docket.activities.findIndex(v => v.status === 0);
                if (activity_index === -1) return processRejectedApplication(docket_reference);
            })
            .then((result) => {
                results.permit = result;
                console.log('rejected application result :', result);

                const notification_message = {
                    title: `Your ${getPermitType(results.docket.permit)} Application has been declined.`,
                    message: `Application with reference #${results.docket.reference_no} has been declined by ${department_title}.`
                }
                console.log('process.env.VUE_APP_BASE_API_URI :', process.env.VUE_APP_BASE_API_URI);
                return axios.post(`${process.env.VUE_APP_BASE_API_URI}/subscriptions/notify/${results.docket.account_id}`, notification_message)
            })
            .then((result) => {
                console.log('Notification result :', result);
                console.log('results :', results);
                res.json(results)
            })
            .catch((errors) => {
                res.json({ errors })
            });
    })

function getPermitType(type) {
    if (type === "business") return "Business Permit";
    else if (type === "cedula") return "Community Tax Certificate";
    else if (type === "barangay") return "Barangay Clearance";
    else if (type === "police") return "Police Clearance";
    return "";
}

/**
 * @returns {Promise}
 * @param {String} reference_no 
 */
function processRejectedApplication(reference_no) {
    return new Promise((resolve, reject) => {
        var results = {};

        DocketsDao.modifyOne({ reference_no }, { status: 2, date_rejected: new Date() })
            // Update Docket
            .then((result) => {
                results.docket = result;

                return ApplicationDao.findOneByReference(reference_no);
            })
            // Update Application
            .then((application) => {
                results.application = application;

                return AccountDao.findOneByID(application.account_id);
            })
            // Find the user
            .then((user) => {
                // GET PERMIT CLASSIFICATION
                const permit_classification =
                    results.application.permit_type === "business" ? "Business" :
                        results.application.permit_type === "cedula" ? "Community Tax Certificate" :
                            results.application.permit_type === "barangay" ? "Barangay" :
                                results.application.permit_type === "police" ? "Police" : "";

                const substitutions = {
                    name: user.name.first,
                    reference_no,
                    permit_classification,
                    date: new Date(),
                    link: `${process.env.VUE_APP_HOME_URL}` //link of Declined app pdf
                }
                return sendgrid.sendEmail(user.email, "REJECT_APP_NOTIFICATION", substitutions)
            })
            // Send Email Notifiation
            .then((result) => {
                console.log('sendgrid result :', result);
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
                const activity = result.activities.find(v => v.department === department);
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

router.route('/applications/:permit_type/:ref_no')
    .get((req, res) => {
        console.log('req.params.permit_type :', req.params.permit_type);
        // BussinessApplicationDao.findOneByReference(req.params.ref_no)
        ApplicationDao.findOneByReference(req.params.ref_no)
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