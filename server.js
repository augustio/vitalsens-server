var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./models/User');
var auth = require('./controllers/auth');
var patient = require('./controllers/patient');
var record = require('./controllers/record');
var recordData = require('./controllers/recordData');
var config = require('./config');


app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/records', record.get);
app.get('/api/record-details', recordData.get);
app.get('/api/patients', patient.get);

app.post('/api/record', record.post);

app.post('/auth/register', auth.register);

config.connectDb();

var server = app.listen(5000, function(){
    console.log("Listening on port 5000");
});
