const models = require('../models');
const Comment = models.Comment
const Nasa = models.Nasa

function index(req, res){
    let nasaID = req.params.nasa_id
    Nasa.findById(nasaID, function(err, foundNasa){
        if (err) res.send('Comment index Controller', err);
        else{
            let comments = foundNasa.comments
            res.json(comments);
        }
    })
}

function show(req, res){
    let nasaID = req.params.nasa_id
    Comment.findById(nasaID, function(err, showComment){
        if(err) res.send('Comment show controller', err);
        res.json(showComment)
    })
}

function create(req, res){
    Comment.create(req.body, function(err, commentSuccess){
        if(err) console.log('Comment create controller', err)
        else{
            Nasa.findById.req.params.nasa_id, function(err, nasaSuccess){
                if(err) res.send('Comment Create Controller inside Nasa Find by ID', err);
                else{
                    nasaSuccess.comments.push(commentSuccess);
                    nasaSuccess.save();
                    res.json(commentSuccess)
                }
            }
        }
    })
}

function destroy(req, res){
    let nasaID = req.params.nasa_id
    Nasa.findById(nasaID, function(err, foundNasa){
        if(err) res.send('Comment destroy controllers', err);
        else {
            let commentToDelete = foundNasa.comments.id(req.params.comment_id);
            if(commentToDelete){
                commentToDelete.remove();
                foundNasa.save(function(err, saved){
                    console.log('REMOVED', commentToDelete._id, 'From', foundNasa.comments);
                    res.json(commentToDelete);
                })
            } else{
                res.send(404)
            }
        }
    })
}

module.exports = {
    index: index, 
    create: create, 
    show: show, 
    destroy: destroy, 
};