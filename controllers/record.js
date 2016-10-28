var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');

module.exports = {
    
    get: function (req, res){
        if(req.query.patientId != null){
            Record.find({patientId: req.query.patientId})
                .sort({timeStamp: -1}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            Record.find({}, 'timeStamp patientId type').sort({timeStamp: -1}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
        
    },

    post: function(req, res){
        var recordData = new RecordData({
            "timeStamp": req.body.timeStamp,
            "patientId": req.body.patientId,
            "start": req.body.start,
            "end": req.body.end,
            "type": req.body.type,
            "chOne": req.body.chOne,
            "chTwo": req.body.chTwo,
            "chThree": req.body.chThree,
            "rPeaks": req.body.rPeaks,
            "pvcEvents": req.body.pvcEvents,
            "rrIntervals": req.body.rrIntervals,
            "hrvFeatures": req.body.hrvFeatures
        });
        var record = new Record({
            "timeStamp": req.body.timeStamp,
            "patientId": req.body.patientId,
            "type": req.body.type,
            "sessionId": req.body.sessionId,
            "streamUrl": req.body.streamUrl,
            "outputUrl": req.body.outputUrl
        });
        var patient = new Patient({"patientId": recordData.patientId});
        
        recordData.save(function(err, rd){
            if(err){
                res.status(409).send({message: "Duplicate record not allowed"});
            }else{
                record.save(function(err, r){
                    if(err)
                        console.log("Duplicate records not allowed");
                });
                patient.save(function(err, p){
                    if(err)
                        console.log("Duplicate patients not allowed");
                });
                var result = {
                    "rPeaks": rd.rPeaks,
                    "pvcEvents": rd.pvcEvents,
                    "rrIntervals": rd.rrIntervals,
                    "hrvFeatures": rd.hrvFeatures 
                }
                res.status(200).send({data: result});
            }
        });
    },
    
    delete: function(req, res){
        RecordData.remove({
            patientId: req.query.patientId,
            timeStamp: req.query.timeStamp,
            type: req.query.type
        }, function(err, rdRes){
            console.log("Number of Record data removed: " + rdRes.result.n);
            Record.remove({
                patientId: req.query.patientId,
                timeStamp: req.query.timeStamp,
                type: req.query.type
            }, function(err, rRes){
                if(rRes.result.n < 1){
                    res.status(409).send({message: "Record not found"});
                }else{
                    res.status(200).send({message: "Record deleted"});
                }
            });
        });
    }
}
