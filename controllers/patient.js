var Patient = require('../models/patient');

module.exports = {
    get: function (req, res){
        Patient.find({}).exec(function(err, result){
            if(err){
                console.error(err);
            }
            res.send(result);
        });
    }
}
