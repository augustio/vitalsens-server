var Patient = require('../models/Patient');

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
