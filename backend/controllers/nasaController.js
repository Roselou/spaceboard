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
    Nasa.findOne(req.params.nasa_id, function(err, showNasa){
        if (err) {
            res.send('Nasa show controller error', err);
        } else {
            res.json(showNasa);
        }
       
    })
}

function create(req, res){
    Nasa.findOrCreate({nasa_id: req.params.nasa_id}, function(err, nasaObj){
        console.log('New nasaObj inserted', nasaObj)
        if(err){
            res.send('Nasa Create Controller Err:', err);
        } else {
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