const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const spaceboardRouter = require('./config/routes');

app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});


app.get('/', function(req, res){
   res.send('aejhsf')
})
//Config Routes
app.use(spaceboardRouter);

//Listen here
app.listen(process.env.PORT || 8080, function(){
    console.log('server running on 8080')
});