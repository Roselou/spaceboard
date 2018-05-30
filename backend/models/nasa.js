const mongoose = require('mongoose');
Schema = mongoose.Schema
Comment = require('./comment.js');
const findOrCreate = require('mongoose-findorcreate');

const NasaSchema = new Schema ({
    title: String, 
    nasa_id: String,
    image_url: String,  
    description_508: String,
    comments: [Comment.schema]
})

NasaSchema.plugin(findOrCreate);
const Nasa = mongoose.model('Nasa', NasaSchema);

module.exports = Nasa;