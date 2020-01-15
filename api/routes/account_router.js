"use strict"
const router = require("express").Router();

var AccountDao = require('../dao/AccountDao');
const jwt = require('jsonwebtoken');
const sendgrid = require('../utils/email');

router.route('/')
    .get((req, res) => {
        AccountDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        AccountDao.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

router.route('/user/profile/:email')
    .get((req, res) => {
        console.log("test get id: " + JSON.stringify(req))
        // AccountDao.findOneByID()
        AccountDao.findByEmail(req.params.email)
            .then((result) => {
                console.log("find by email result: " + JSON.stringify(result))
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            })
    })

router.route('/profile')
    .post((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;
        console.log('account_id :', account_id);
        console.log('req.body :', req.body);
        AccountDao.modifyById(account_id, req.body)
            .then((account) => {
                account.password = null;
                res.json(account);
            }).catch((err) => {
                res.json({ errors: err });
            });
    })

router.route('/password/:id')
    .post((req, res) => {
        AccountDao.changePassword(req.params.id, req.body)
            .then((account) => {
                account.password = null;
                res.json(account);
            }).catch((err) => {
                console.error(err)
                res.sendStatus(500);
            });
    })

router.route('/resetpassword/request')
    .get((req, res) => {
        const email = req.query.email;
        if (email) {
            AccountDao.findByEmail(email)
                .then((account) => {
                    if (account) {
                        const encrypted_data = new Buffer(JSON.stringify({ account_id: account._id })).toString('base64');
                        const substitutions = {
                            name: account.name.first,
                            url: `${process.env.VUE_APP_HOME_URL}resetpassword/${encrypted_data}`
                        }
                        return sendgrid.sendEmail(email, "PASSWORD_RESET_REQUEST_TEMPLATE", substitutions)
                    }
                })
                .then((result) => {
                    if (result) {
                        res.json({
                            isValid: true,
                            message: "Your request has been sent to your email."
                        })
                    } else {
                        res.json({
                            isValid: false,
                            message: "Email is not valid."
                        })
                    }
                })
                .catch((error) => {
                    res.json({ error })
                });
        } else {
            res.json({
                isValid: false,
                message: "Email is not valid."
            })
        }
    })
    .post((req, res) => {
        console.log('###decoded :', jwt.decode(req.headers.access_token));
        const decoded_data = jwt.decode(req.headers.access_token),
            account_id = decoded_data.account_id,
            user_email = decoded_data.email,
            user_name = decoded_data.name
        AccountDao.matchPassword(account_id, req.body.password)
            .then((isValid) => {
                if (isValid) {
                    const encrypted_data = new Buffer(JSON.stringify({ account_id })).toString('base64');
                    const substitutions = {
                        name: user_name.first,
                        url: `${process.env.VUE_APP_HOME_URL}resetpassword/${encrypted_data}`
                    }
                    return sendgrid.sendEmail(user_email, "PASSWORD_RESET_REQUEST_TEMPLATE", substitutions)
                }
            })
            .then((result) => {
                if (result) {
                    var mask_email = "", prefix = user_email.substring(0, user_email.lastIndexOf("@")),
                        postfix = user_email.substring(user_email.lastIndexOf("@"))

                    for (var i = 0; i < prefix.length; i++) {
                        if (i == 0 || i == prefix.length - 1) mask_email = mask_email + prefix[i].toString();
                        else mask_email = mask_email + "*";
                    }
                    mask_email = mask_email + postfix;

                    res.json({
                        isValid: true,
                        message: `Your request has been sent to your email (${mask_email}).`
                    })
                } else {
                    res.json({
                        isValid: false,
                        message: "Input Password does not match."
                    })
                }
            }).catch((error) => {
                res.json({ error })
            });
    })


router.route('/resetpassword/:code')
    .get((req, res) => {
        const retrieved_data = new Buffer(req.params.code, "base64").toString();
        var data = null;
        try {
            data = JSON.parse(retrieved_data);
            console.log('data :', data);
        } catch (error) {
            // res.json({
            //     isValid: false,
            //     message: "Encrypted data not valid."
            // })
        }

        if (data && data.account_id) {
            AccountDao.findOneByID(data.account_id)
                .then((user) => {
                    console.log('###check user :', user);
                    if (user) {
                        res.json({
                            isValid: true
                        })
                    } else {
                        res.json({
                            isValid: false,
                            message: "Encrypted data not valid."
                        })
                    }
                }).catch((error) => {
                    res.json({ error })
                });
        } else {
            res.json({
                isValid: false,
                message: "Encrypted data not valid."
            })
        }
    })
    .post((req, res) => {
        console.log('###code :', req.params.code);
        const retrieved_data = new Buffer(req.params.code, "base64").toString();
        var data = null;
        try {
            data = JSON.parse(retrieved_data);
            console.log('data :', data);
        } catch (error) {
            // res.json({
            //     success: false,
            //     message: "Encrypted data not valid."
            // })
        }

        if (data && data.account_id) {
            AccountDao.changePassword(data.account_id, req.body)
                .then((result) => {
                    console.log('result :', result);
                    res.json({
                        success: true,
                        message: "Successfully update your password."
                    })
                }).catch((error) => {
                    res.json({ error })
                });
        } else {
            res.json({
                success: false,
                message: "Encrypted data not valid."
            })
        }
    })

router.route('/:id')
    .get((req, res) => {
        console.log("find one account id by one: " + JSON.stringify(req.params.id))
        var data = req.params.id
        AccountDao.findOne({
            email: data
        })
            .then((result) => {
                console.log("find one by id: " + JSON.stringify(result))
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })
    .post((req, res) => {
        AccountDao.modifyOne({
            session_token: req.params.id
        }, req.body)
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({
                    errors
                })
            });
    })

module.exports = router