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



function create(req, res) {
    Nasa.findOne({nasa_id: req.params.nasa_id}, function(err, nasaSuccess){

        function createComment(req, res, newNasa) {
            Comment.create(req.body, function(err, commentSuccess) {
                if (commentSuccess) {
                    newNasa.comments.push(commentSuccess);
                    newNasa.save();
                    res.json(newNasa);
                }
            })
        }

        if (nasaSuccess === null) {
            Nasa.create({nasa_id: req.params.nasa_id}, function(err, newNasa) {
                createComment(req, res, newNasa)
            });
        } else {
            createComment(req, res, nasaSuccess);
        }
    })
}

// function create(req, res) {
//     Nasa.find({
//         nasa_id: req.params.nasa_id
//     }, function (err, nasaSuccess) {
//         console.log('err', err)
//         console.log('found me', nasaSuccess)

//         function createComment(req, res, newNasa) {
//             Comment.create(req.body, function (err, commentSuccess) {
//                 console.log('err', err);

//                 if (commentSuccess) {
//                     console.log('commentSuccess', commentSuccess)
//                     console.log(123, newNasa[0].comments)
//                     newNasa[0].comments.push(commentSuccess);
//                     newNasa[0].save();
//                     res.json(newNasa[0]);
//                 }

//             })
//         }


//         if (nasaSuccess.length === 0) {
//             console.log('in1')
//             Nasa.create({
//                 nasa_id: req.params.nasa_id
//             }, function (err, newNasa) {
//                 createComment(req, res, newNasa)
//             });
//         } else {
//             createComment(req, res, nasaSuccess);
//         }
//     })
// }
// function create(req, res){
//     Comment.create(req.body, function(err, commentSuccess){
//         if(err) {
//             console.log('Comment create controller', err)
//         } else {
//             Nasa.findById(req.params.nasa_id, function(err, nasaSuccess){
//                 if(err) res.send('Comment Create Controller inside Nasa Find by ID', err);
//                 else{
//                     nasaSuccess.comments.push(commentSuccess);
//                     nasaSuccess.save();
//                     res.json(commentSuccess)
//                 }
//             }
//         })
//     }
// }

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