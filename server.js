var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./models/User');
var auth = require('./controllers/auth');
var patient = require('./controllers/patient');
var record = require('./controllers/record');
var recordData = require('./controllers/recordData');
var appConfig = require('./config/appConfig');
var checkAuthenticated = require('./services/checkAuthenticated');
var osppAnalyse = require('./services/osppAnalyse');
var cors = require('./services/cors');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50', extended: true}));

app.use(cors);

app.use(express.static('public'));

app.get('/api/records', record.get);
//app.get('/api/records', checkAuthenticated, record.get);
app.get('/api/record-details', checkAuthenticated.get, recordData.get);
app.get('/api/full-record-data', recordData.getFullRecordData);
app.get('/api/record-analysis', recordData.getRecordAnalysis);
app.get('/api/patients', checkAuthenticated.get, patient.get);


app.post('/api/record', checkAuthenticated.post_modify, osppAnalyse, record.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

app.delete('/api/record', checkAuthenticated.post_modify, record.delete);
app.delete('/api/patient', checkAuthenticated.post_modify, patient.delete);

appConfig.connectDb();

var server = app.listen(5000, function(){
    console.log("Listening on port 5000");
});
