var express = require('express');
var router = express.Router();
var db = require('../models/index');
var async = require("async");

/*******************************************************************
 * RETRIEVE event info BASED ON event id *
 * URL:/api/event/{event_id}
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
