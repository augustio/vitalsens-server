var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('./services/cors');
var User = require('./models/User');
var auth = require('./controllers/auth');
var patient = require('./controllers/patient');
var record = require('./controllers/record');
var recordData = require('./controllers/recordData');
var user = require('./controllers/user');
var appConfig = require('./config/appConfig');
var checkAuthenticated = require('./services/checkAuthenticated');
var osppAnalyse = require('./services/osppAnalyse');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50', extended: true}));

app.use(cors);

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '../vitalsens-client/dist')));

app.get('/api/records', record.get);
app.get('/api/record-details', checkAuthenticated.get, recordData.get);
app.get('/api/full-record-data', recordData.getFullRecordData);
app.get('/api/record-analysis', recordData.getRecordAnalysis);
app.get('/api/patients', checkAuthenticated.get, patient.get);
app.get('/api/users', user.get);


//app.post('/api/record', checkAuthenticated.post_modify, osppAnalyse, record.post);
app.post('/api/record', checkAuthenticated.post_modify, record.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.post('/api/users', user.post);

app.delete('/api/record', checkAuthenticated.post_modify, record.delete);
app.delete('/api/patient', checkAuthenticated.post_modify, patient.delete);
app.delete('/api/user', user.delete);

appConfig.connectDb();

var server = app.listen(5000, function(){
    console.log("Vitalsens Cloud live on port 5000");
});
