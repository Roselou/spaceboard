const models = require('../models');
const Nasa = models.Nasa
const findOrCreate = require('mongoose-findorcreate');

function index(req, res) {
    Nasa.find({}, function(err, foundNasa){
        if(err) res.send('Nasa index controller:', err);
        res.json(foundNasa);
    })
}

function show(req, res){
    console.log('in nasa/show', req.params)
    Nasa.find({nasa_id: req.params.nasa_id}, function(err, showNasa){
        if (err) {
            console.log(2222222222, err)
            res.send({error: 'Nasa show controller error'});
        } else {
            console.log(11111111, showNasa)
            res.json(showNasa);
        }
       
    })
}

function create(req, res){
    console.log('in nasa/create', req.body)
    newNasa = req.body;
    Nasa.findOrCreate(newNasa, function(err, nasaObj){
        console.log('New nasaObj inserted', nasaObj)
        if(err){
            res.send('Nasa Create Controller Err:', err);
        } else {
            console.log('creating new nasa', nasaObj)
            nasaObj.save();
            res.json(nasaObj)
        }
    })
}

function update(req, res) {
    let nasaID = req.params.nasa_id
    Nasa.findByIdAndUpdate(nasaID, {$set: req.body}, function(err, updatedNasa){
        if(err) res.send('Nasa Update controller', err)
        res.json(updatedNasa)
    })
}

module.exports = {
    index: index, 
    show: show, 
    create: create,
    update: update,
}