const mongoose = require('mongoose');
Schema = mongoose.Schema; 
const findOrCreate = require('mongoose-findorcreate');

const CommentSchema = new Schema ({
    name: String, 
    comments: String, 
})

CommentSchema.plugin(findOrCreate);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;