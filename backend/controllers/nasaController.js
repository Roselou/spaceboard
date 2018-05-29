const models = require('../models');
const Nasa = models.Nasa

function index(req, res) {
    Nasa.find({}, function(err, foundNasa){
        if(err) res.send('Nasa index controller:', err);
        res.json(foundNasa);
    })
}

function show(req, res){
    let nasaID = req.params.nasa_id
    console.log('nasa show controller', nasaID)
    Nasa.findById(nasaID, function(err, showNasa){
        if (err) res.send('Nasa show controller', err);
        res.json(showNasa);
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
    update: update,
}