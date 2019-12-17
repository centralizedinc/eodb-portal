const router = require("express").Router();

var dao = require('../dao/SubscriptionDao');

router
    .route('/')
    .get((req, res) => {
        dao.findAll()
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        dao.create(req.body)
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router
    .route('remove/:id')
    .get((req, res) => {
        dao.removeSubscriptionByAccountId(req.params.id)
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route("/broadcast")
    .post((req, res) => {
        dao.broadcast(req.body)
        res.sendStatus(200)
    })

router.route("/notify/:id")
    .post((req, res) => {
        dao.push(req.params.id, req.body)
        res.sendStatus(200)
    })

router
    .route('/:id')
    .get((req, res) => {
        dao.findByAccountId(req.params.id)
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })
    .post((req, res) => {
        dao.modifyByAccountId(req.body)
            .then((result) => {
                res.json({ result })
            }).catch((errors) => {
                res.json({ errors })
            });
    })

module.exports = router;