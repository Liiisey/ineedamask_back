var express = require('express');
var router = express.Router();
var Pharmacy = require('../models/Pharmacy');

router.get('/', (req, res) => {
    Pharmacy.find().populate('user').exec((err, pharmacies) => {
        res.json(pharmacies);
    });
});

router.post('/', (req, res) => {
    const pharmacy = new Pharmacy ({
        name: req.body.name,
        address: req.body.address,
        geometry: {
            type: 'Point',
            coordinates: [req.body.longitude, req.body.latitude]
        },
        mask: req.body.mask
    });
    pharmacy.save((err, newPharmacy) => {
        if (err) return res.json(err);
        res.json(newPharmacy);
    });
});


module.exports = router;