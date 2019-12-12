
const router = require("express").Router();
const ChecklistDao = require('../dao/ChecklistDao');

router.route('/')
    .get((req, res)=>{
        ChecklistDao.findAll()
        .then((result) => {
            res.json(result)
        }).catch((errors) => {
            res.json({ errors })
        });
    })
    .post((req, res)=>{
        ChecklistDao.create(req.body)
        .then((result) => {
            res.json(result)
        }).catch((errors) => {
            res.json({ errors })
        });
    })

router.route('/:department/:permit')
    .get((req, res)=>{
        ChecklistDao.findByDepartment(req.params.department, req.params.permit)
        .then((result) => {
            res.json(result)
        }).catch((errors) => {
            res.json({ errors })
        });
    })

module.exports = router