const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/spaceboard")
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log('mongodb err', err));

module.exports.Nasa = require('./nasa');
module.exports.Comment = require('./comment');