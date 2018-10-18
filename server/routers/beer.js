var express = require('express');
var router = express.Router();
var db = require('../models/index');
var shortid = require('shortid');
var async = require("async");

/*******************************************************************
 * RETRIEVE BEER BASED ON BEER_ID *
 * URL:/api/beer/{beer_id}
 *******************************************************************/
//changed
router.route('/:id(\\d+)').get(function (req, res) {
    db.beer.findAll({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'Alchohol_content', 'beer_description', 'beer_logo', 'price'],
        include: [{
            attributes: ['id', 'beer_style_id', 'beer_id'],
            model: db.beer_category,
            include: [{
                attributes: ['id', 'type'],
                model: db.beer_style
            }]
        }]
    }).then((beer) => {
        res.json({ error: false, result: beer, text: 'data found' });

    }).catch((err) => {
        res.json({ error: true, result: [], text: err });
    });
});

/********************************************************
 * FETCH ALL BEER LIST WITH PAGINATION[5 ITEM PER PAGE] *
 * URL:/api/beer/page/{page_number}
 * example:/api/beer/page/1
 ********************************************************/

router.route('/page/:id').get(function (req, res) {
    let page = req.params.id;
    if (!req.params.id) {
        page = 1;
    }
    let limit = 5;
    let offset = 0;
    let more = false;
    db.location_beer.findAndCountAll().then((data) => {
        //let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        let extra = limit * page;
        if (extra < data.count) {
            more = true;
        }
        db.location_beer.findAll({
            order: '"id" DESC',
            limit: limit,
            offset: offset,
            include: [{
                attributes: ['id', 'name', 'Alchohol_content', 'beer_description', 'beer_logo', 'price'],
                model: db.beer,
                include: [{
                    attributes: ['id', 'beer_style_id', 'beer_id'],
                    model: db.beer_category,
                    include: [{
                        attributes: ['id', 'type'],
                        model: db.beer_style
                    }]
                }]
            }]
        }).then(function (location_beer) {
            res.json({ error: false, result: location_beer, more_rows: more, text: 'data found' });
        }).catch(function (error) {
            res.json({ error: true, result: [], text: 'Internal Server Error*' });
        });

    }).catch(function (error) {
        res.json({ error: true, result: [], text: 'Internal Server Error' });
    });
});

/********************************************************************
 * FETCH BEER LIST OF PARTICULAR BREWARY LOCATION USING LOCATION_ID *
 * URL:/api/beer/location/{location_id}
 ********************************************************************/

router.route('/location/:id').get(function (req, res) {
    let location_id = req.params.id;
    db.location_beer.findAll({
        where: {
            location_id: location_id
        },
        include: [{
            model: db.beer,
            include: [{
                model: db.beer_category,
                include: [{
                    model: db.beer_style
                }]
            }]
        }]
    }).then(function (location_beer) {
        res.json({ error: false, result: location_beer, text: 'data found' });
    }).catch(function (error) {
        res.json({ error: true, result: [], text: 'Internal Server Error' });
    });
});



// added new api

router.route('/beerStyles').get(function (req, res) {
    console.log('/beerStyles');
    db.beer_style.findAll({}).then(function (beerStyles) {
        res.json({ error: false, result: beerStyles, text: 'data found' });
    }).catch(function (error) {
        res.json({ error: true, result: [], text: 'Internal Server Error' });
    });
});

router.route('/add_beer_style').post(function (req, res) {
    db.beer_style.create(req.body).then(beer_style => {
        if (beer_style.id != '') {
            res.json({ error: false, result: beer_style });
        }
        else {
            res.json({ error: true, result: '', text: 'Something is wrong' });
        }
    }).catch((err) => {
        res.json({ error: true, result: err.errors[0].message });
    });
});

router.route('/location').post(function (req, res) {
    var host;
    if (req.secure == true) {
        host = 'https://' + req.headers.host;
    }
    else {
        host = 'http://' + req.headers.host;
    }
    var cat = req.body.category;
    var base64Str = req.body.beer_logo;
    var base64Image = base64Str.split(';base64,').pop();
    var name = shortid.generate();
    var filename = name.replace(/\s/g, "") + '.png';
    var filepath = path.join(__dirname, '../public/location/' + filename);
    var obj = {
        name: req.body.name,
        Alchohol_content: req.body.Alchohol_content,
        beer_description: req.body.beer_description,
        beer_logo: host + '/static/uploads/' + filename,
        price: req.body.price
    };
    db.beer.findAll({
        where: {
            name: req.body.name
        }
    }).then(function (existbeer) {
        if (existbeer.length == 0) {
            fs.writeFile(filepath, base64Image, { encoding: 'base64' }, (err) => {
                if (!err) {
                    db.beer.create(obj).then(beer => {
                        if (beer.id != '') {
                            db.location_beer.create({ beer_id: beer.id, location_id: req.body.location_id }).then((loc_beer) => {
                                let comp = [];
                                for (let i = 0; i < cat.length; i++) {
                                    comp.push({ beer_id: beer.id, beer_style_id: cat[i] });
                                }
                                db.beer_category.bulkCreate(comp).then(() => {
                                    res.json({ error: false, result: beer });
                                }).catch((err) => {
                                    res.json({ error: true, result: err });
                                });
                            }).catch((err) => {
                                res.json({ error: true, result: err.errors[0].message });
                            });
                        }
                        else {
                            res.json({ error: true, result: '', text: 'Something is wrong' });
                        }
                    }).catch((err) => {
                        res.json({ error: true, result: err });
                    });
                }
                else {
                    res.json({ error: true, result: err });
                }
            });
        }
        else {
            res.json({ error: true, result: '', text: 'Beer Name already exist' });
        }
    }).catch(function (error) {
        res.json({ error: true, result: [], text: 'Internal Server Error' });
    });
});

router.route('/').post(function (req, res) {
    db.beer.create(req.body).then(beer => {
        if (beer.id != '') {
            let cat = req.body.category;
            console.log(cat.length);
            let comp = [];
            for (let i = 0; i < cat.length; i++) {
                comp.push({ beer_id: beer.id, beer_style_id: cat[i] });
            }
            db.beer_category.bulkCreate(comp).then(() => {
                res.json({ error: false, result: beer });
            }).catch((err) => {
                res.json({ error: true, result: err });
            });
        }
        else {
            res.json({ error: true, result: '', text: 'Something is wrong' });
        }
    }).catch((err) => {
        res.json({ error: true, result: err.errors[0].message });
    });
});

module.exports = router;