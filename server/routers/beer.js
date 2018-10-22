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
router.route('/location/:id(\\d+)').get(function (req, res) {
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
        var activebeers=[];
        var archivebeers=[];
        var arr={};
        if(location_beer.length>0)
        {
            for (var i=0; i<location_beer.length; i++) {
                (function(num){
                    if(location_beer[i].dataValues.active==1)
                    {
                        activebeers.push(location_beer[i].dataValues);
                    }
                    else
                    {
                        archivebeers.push(location_beer[i].dataValues);
                    }
                    if(i==location_beer.length-1)
                    {
                        arr.activebeers=activebeers;
                        arr.archivebeers=archivebeers;
                        res.json({ error: false, result: arr, text: 'data found' });
                    }
                })(i);  
            } 
        }
        else
        {
            arr.activebeers=activebeers;
            arr.archivebeers=archivebeers;
            res.json({ error: false, result: arr, text: 'data not found' });
        }
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

//update beer logo using beer id
router.route('/update_beer_logo/:id(\\d+)').post(function (req, res) {
    var host;
    if (req.secure == true) {
        host = 'https://' + req.headers.host;
    }
    else {
        host = 'http://' + req.headers.host;
    }
    var base64Str = req.body.beer_logo;
    var base64Image = base64Str.split(';base64,').pop();
    var name = shortid.generate();
    var filename = name.replace(/\s/g, "") + '.png';
    var filepath = path.join(__dirname, '../public/location/' + filename);
    var beer_logo = host + '/static/uploads/' + filename;
    db.beer.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (beer) {
        if (!beer) {
            res.json({ error: true, result: '', text: 'There is no beer data found' });
        }
        else {
            fs.writeFile(filepath, base64Image, { encoding: 'base64' }, (err) => {
                if (!err) {
                    beer.update({ beer_logo: beer_logo }).then((response) => {
                        res.json({ error: false, result: '', text: 'beer logo has been changed successfully' });
                    }).catch((err) => {
                        res.json({ error: true, result: err, text: 'Error found during updation' });
                    });
                }
                else {
                    res.json({ error: true, result: err });
                }
            });
        }
    }).catch(function (error) {
        res.json({ error: true, result: [], text: 'Internal Server Error' });
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


//remove beer
router.route('/remove_beer/:id(\\d+)').post(function (req, res) {
    var beer_id = req.params.id;
    var location_id = req.body.location_id;
    db.location_beer.destroy({
        where: {
            location_id: location_id,
            beer_id: beer_id
        }
    }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
        console.log(rowDeleted + 'Deleted successfully');
        res.json({ error: false, result: [], text: 'beer successfully removed' });

    }, function (err) {
        console.log(err);
        res.json({ error: true, result: err, text: 'Something is wrong' });
    });
});


router.route('/move_to_ontap/:id(\\d+)').post(function(req,res){
      
        db.location_beer.findOne({
            where: {
                beer_id:req.params.id,
                location_id:req.body.location_id,
                active:0  //archive
            }
        }).then(function (location_beer) {
            if (!location_beer) {
                res.json({ error: true, result: '', text: 'beer is not archive beer' });
            }
            else {
                var obj={
                    active:1
                };
                location_beer.update(obj).then((response) => {
                    res.json({ error: false, result: '', text: 'beer successfully moved to beer on tap.' });
                }).catch((err) => {
                    res.json({ error: true, result: err, text: 'Error found during updation' });
                });
            }
        }).catch(function (error) {
            res.json({ error: true, result: [], text: 'Internal Server Error' });
        });
});



router.route('/move_to_archive/:id(\\d+)').post(function(req,res){
      
    db.location_beer.findOne({
        where: {
            beer_id:req.params.id,
            location_id:req.body.location_id,
            active:1 //active
        }
    }).then(function (location_beer) {
        if (!location_beer) {
            res.json({ error: true, result: '', text: 'beer is not archive beer' });
        }
        else {
            var obj={
                active:0
            };
            location_beer.update(obj).then((response) => {
                res.json({ error: false, result: '', text: 'beer successfully moved to archive list.' });
            }).catch((err) => {
                res.json({ error: true, result: err, text: 'Error found during updation' });
            });
        }
    }).catch(function (error) {
        res.json({ error: true, result: [], text: 'Internal Server Error' });
    });
});
module.exports = router;