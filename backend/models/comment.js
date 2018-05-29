const mongoose = require('mongoose');
Schema = mongoose.Schema; 

const CommentSchema = new Schema ({
    name: String, 
    comments: String, 
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;