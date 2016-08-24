var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');
var configFile = require('../config/appConfig');
var autobahn = require('autobahn');
var ospp = require('../ospp');

module.exports = {
    
    get: function (req, res){
        if(req.query.timeStamp == null && req.query.patientId == null){
            Record.find({}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else if(req.query.timeStamp != null && req.query.patientId != null){
            Record.findOne({timeStamp: req.query.timeStamp, 
                            patientId: req.query.patientId}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else if(req.query.patientId != null){
            Record.find({patientId: req.query.patientId}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
        
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
        patient.save(function(err, pat){
            if(err){
                console.error(err);
            }
        });
        recordData.save(function(err, rd){
            if(err){
                console.error(err);
                res.status(409).send({message: "Duplicate record not allowed"});
            }else{
                res.status(200).send({message: "record successfully stored"});
                var d = rd.chOne.split(",");
                var id = rd._id;
                var ecgDoc = {"id": id,
                                "chOne": d
                             };
                ospp.process(ecgDoc);
            }
        });
    }
}
