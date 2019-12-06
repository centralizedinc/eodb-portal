"use strict"
const router = require("express").Router();

var RegionDao = require('../dao/references/RegionDao');
var ProvinceDao = require('../dao/references/ProvinceDao');
var CityDao = require('../dao/references/CityDao');
var BarangayDao = require('../dao/references/BarangayDao');

// REGIONS
router.route('/regions')
    .get((req, res) => {
        RegionDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })


// PROVINCES
router.route('/provinces')
    .get((req, res) => {
        ProvinceDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/provinces/region/:code')
    .get((req, res) => {
        ProvinceDao.find({ regCode: req.params.code })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })


// CITIES
router.route('/cities')
    .get((req, res) => {
        CityDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/cities/province/:code')
    .get((req, res) => {
        CityDao.find({ provCode: req.params.code })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })


// BARANGAY
router.route('/barangay')
    .get((req, res) => {
        BarangayDao.findAll()
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })

router.route('/barangay/city/:code')
    .get((req, res) => {
        BarangayDao.find({ citymunCode: req.params.code })
            .then((result) => {
                res.json(result)
            }).catch((errors) => {
                res.json({ errors })
            });
    })


module.exports = router