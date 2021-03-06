var router = require("express").Router();

var Uploader = require('../utils/uploader');
const jwt = require('jsonwebtoken');

router.route('/')
    .post((req, res) => {
        console.log('uploading...', req.query);
        const directory = `${req.query.permit}/${req.query.account_id}`
        const upload = Uploader.uploadDocuments(directory);
        upload(req, res, function (err, some) {
            // console.log('some :', some);
            console.log('err :', err);
            console.log('req :', req.files);
            res.json(req.files);
        })
    })


router.route('/permits')
    .post((req, res) => {
        console.log('uploading permits...', req.query);
        const directory = `${req.query.permit}/${req.query.account_id}`
        const upload = Uploader.uploadPermitsDocRequired(directory);
        upload(req, res, function (err, some) {
            // console.log('some :', some);
            console.log('err :', err);
            console.log('req :', req.files);
            res.json(req.files);
        })
    })

router.route('/avatar')
    .post((req, res) => {
        const account_id = jwt.decode(req.headers.access_token).account_id;
        console.log('uploading profile pic...', account_id);
        const upload = Uploader.uploadAvatar(account_id);
        upload(req, res, function (err, some) {
            res.json(req.file);
        })
    })

router.route('/epermit/:epermit_no')
    .post((req, res) => {
        console.log('uploading permits...', req.params.epermit_no);
        const upload = Uploader.uploadPermitDocument(req.params.epermit_no);
        upload(req, res, function (err, some) {
            // console.log('some :', some);
            console.log('err :', err);
            console.log('req :', req.file);
            res.json(req.file);
        })
    })

router.route('/receipt/:reference_no/:transaction_no')
    .post((req, res) => {
        console.log('uploading receipt reference_no...', req.params.reference_no);
        console.log('uploading receipt transaction_no...', req.params.transaction_no);
        const upload = Uploader.updateReceipt(req.params.reference_no, req.params.transaction_no)
        upload(req, res, function (err, some) {
            // console.log('some :', some);
            console.log('err :', err);
            console.log('req :', req.file);
            res.json(req.file);
        })
    })


module.exports = router;