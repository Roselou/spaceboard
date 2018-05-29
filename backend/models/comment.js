const mongoose = require('mongoose');
Schema = mongoose.Schema; 

const CommentSchema = new Schema ({
    username: String, 
    Comments: String, 
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;