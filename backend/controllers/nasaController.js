const models = require('../models');
const Nasa = models.Nasa

function index(req, res) {
    Nasa.find({}, function(err, foundNasa){
        if(err) res.send('Nasa index controller:', err);
        res.json(foundNasa);
    })
}

function show(req, res){
    console.log('nasa show controller')
    Nasa.findById(req.params.nasa_id, function(err, showNasa){
        if (err) res.send('Nasa show controller', err);
        res.json(showNasa);
    })
}

function create(req, res){
    Nasa.create({nasa_id: req.params.nasa_id}, function(err, newNasa){
        if(err){
            res.send('Nasa Create Controller Err:', err);
        } else {
            newNasa.save();
            res.json(newNasa)
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