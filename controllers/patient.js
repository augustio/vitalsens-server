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
    }
}
