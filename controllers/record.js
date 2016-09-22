var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');

module.exports = {
    
    get: function (req, res){
        if(req.query.patientId != null){
            Record.find({patientId: req.query.patientId}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            Record.find({}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
        
    },
    post: function(req, res){
        var recordData = new RecordData(req.body);
        
        recordData.save(function(err, rd){
            if(err){
                res.status(409).send({message: "Duplicate record not allowed"});
            }else{
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
        Record.findOne({
            patientId: req.body.patientId,
            timeStamp: req.body.timeStamp,
            type: req.body.type
        }, function(err, record){
            if(err){
                res.status(409).send({message: "Record not found, cannot be deleted"});
            }else if(record != null){
                record.remove(function(err, rec){
                    if(err){
                        console.log(err);
                        res.status(409).send({message: "Encountered some problems deleting record"});
                    }else{
                        res.status(200).send({message: "Deleted record" + rec._id});
                    }
                });
            }else{
                res.status(409).send({message: "Not sure what happened"});
            }
        });
    }
}
