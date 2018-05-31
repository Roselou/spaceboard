const models = require('../models');
const Comment = models.Comment
const Nasa = models.Nasa
const findOrCreate = require('mongoose-findorcreate');


function index(req, res){
    let nasaID = req.params.nasa_id
    Nasa.find({nasa_id: req.params.nasa_id}, function(err, foundNasa){
        if (err) res.send('Comment index Controller', err);
        else{
            let comments = foundNasa.comments
            res.json(comments);
        }
    })
}
function show(req, res) {
        Comment.find({comment_id: req.params.comment_id}, function (err, showComment) {
            if (err){
                res.send('Comment show controller', err);
        }else {
            showComment.save()
            res.json(showComment)
        }
        })
    }


// function create(req, res){
//     Comment.findOrCreate({nasa_id: req.params.nasa_id}, function(err, commentSuccess){
//         if(err){
//             console.log("Comment Create Controller Error", err)
//         } else{
//             Nasa.findById(req.params.nasa_id, function(err, nasaWin){
//                 if(err){
//                     console.log("Comment create controller error inside nasa.findById", err)
//                 } else {
//                     NasaWin.comments.push(commentSuccess);
//                     nasaWin.save();
//                     res.json(commentSuccess)
//                 }
//             })
//         }
//     })
// }

// function create(req, res) {
//     Comment.create(req.body, function (err, commentSuccess) {
//         console.log(req)
//         if (err) console.log('Comment create controller: ', err);
//         else {
//             Nasa.findById(req.params.nasa_id, function (err, nasaSuccess) {
//                 if (err) res.send('Comment create controller: ', err);
//                 else {
//                     nasaSuccess.comments.push(commentSuccess);
//                     nasaSuccess.save();
//                     res.json(commentSuccess);
//                 }
//             })
//         }
//     });
// }

function create(req, res) {
    console.log('in commentcontroller')
    Nasa.findOne({nasa_id: req.params.nasa_id}, function(err, nasaSuccess){
        console.log('req.params:', req.params)

        function createComment(req, res, newNasa) {
            Comment.create(req.body, function(err, commentSuccess) {
                if (commentSuccess) {
                    console.log('comment success', commentSuccess)
                    newNasa.comments.push(commentSuccess);
                    newNasa.save();
                    res.json(newNasa);
                }
            })
        }

        if (nasaSuccess === null) {
            console.log(8989, req.params.nasa_id)
            Nasa.create({nasa_id: req.params.nasa_id}, function(err, newNasa) {
                
                console.log('newNasa  is null', newNasa)
                createComment(req, res, newNasa)
            });
        } else {
            console.log('newNasa is not null (ie exists in db)', nasaSuccess)
            createComment(req, res, nasaSuccess);
        }
    })
}

function update(req, res){
    Nasa.findByIdAndUpdate(req.params.nasa_id, {$set: req.body}, function(err, updatedNasa){
        if (err){
            console.log('nasa update controller err', err)
        } else{
            res.json(updatedNasa)
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
    Nasa.findOne({nasa_id: nasaID}, function(err, foundNasa){
        if(err) {
            res.send('Comment destroy controllers', err);
        }
        else {
            let commentToDelete = foundNasa.comments._id
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
    update: update,
    destroy: destroy, 
};