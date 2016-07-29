var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');
var configFile = require('../config');
var autobahn = require('autobahn');
var metro = require('../metropolia');

module.exports = {
    get: function (req, res){
        Record.find({}).exec(function(err, result){
            if(err){
                console.error(err);
            }
            res.send(result);
        });
    },
    post: function(req, res){
        var recordData = new RecordData(req.body);
        var record = new Record({
            "timeStamp": recordData.timeStamp,
            "patientId": recordData.patientId,
            "type": recordData.type
        });
        var patient = new Patient({"patientId": recordData.patientId});
        record.save(function(err, rec){
            if(err){
                console.error(err);
            }
        });
        res.status(200);
        res.send(JSON.stringify(recordData));
        patient.save(function(err, pat){
            if(err){
                console.error(err);
            }
        });
        recordData.save(function(err, rd){
            if(err){
                console.error(err);
            }
        });
        var d = recordData.chOne.split(",");
        metro.osppAnalyse(d);
    }
}
