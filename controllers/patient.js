var Patient = require('../models/Patient');
var Record = require('../models/Record');
var RecordData = require('../models/RecordData');

module.exports = {
    get: function (req, res){
        if(req.query.patientId == null){
            Patient.find({}, 'patientId').exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            Patient.findOne({patientId: req.query.patientId}, 'patientId').exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
    },
    
    delete: function(req, res){
        RecordData.remove({patientId: req.query.patientId}, function(err, rdRes){
            console.log("Number of Record data removed: " + rdRes.result.n);
            Record.remove({patientId: req.query.patientId}, function(err, rRes){
                console.log("Number of Records removed: " + rRes.result.n);
                Patient.remove({patientId: req.query.patientId}, function(err, pRes){
                    if(pRes.result.n < 1){
                        res.status(409).send({message: "Patient not found"});
                    }else{
                        res.status(200).send({message: "Patient " + req.query.patientId + " deleted"})
                    }
                });
            });
        });
    }
}
