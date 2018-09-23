var express = require('express');
var router = express.Router();
var db = require('../models/index');
var async = require("async");

/*******************************************************************
 * RETRIEVE BEER BASED ON BEER_ID *
 * URL:/api/beer/{beer_id}
 *******************************************************************/

router.route('/:id').get(function (req, res) {
    db.events.findAll({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'featured_image']
    }).then((event) => {
        res.json({ error: false, result:event, text: 'data found' });

    }).catch((err) => {
        res.json({ error: true, result:[], text: err });
    });
});

module.exports = router;
