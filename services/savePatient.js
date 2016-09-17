var Patient = require('../models/Patient');

module.exports = function (req, res, next){
    var patient = new Patient({"patientId": req.body.patientId});
    patient.save(function(err, pat){
        if(err){
            console.log("Duplicate patient record not allowed\n");
        }
        next();
    });
};