var Patient = require('../models/Patient');

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
        if(req.body.patientId != null){
            Patient.findOne({patientId: req.body.patientId}, function(err, patient){
                if (patient != null){
                    patient.remove(function(err, p){
                        if(err){
                            console.log(err);
                            res.status(409).send({message: "Encountered some problems deleting patient " + patient.patientId});
                        }else{
                            console.log("Deleted patient " + p.patientId);
                            res.status(200).send({message: "Deleted patient " + p.patientId});
                        }
                    });
                }else{
                    res.status(409).send({message: "Patient " + req.body.patientId + " not found!"});
                }
            });
        }
    }
}
