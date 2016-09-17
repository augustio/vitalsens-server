var Record = require('../models/Record');

module.exports = function (req, res, next){
    var record = new Record({
        "timeStamp": req.body.timeStamp,
        "patientId": req.body.patientId,
        "type": req.body.type
    });
    record.save(function(err, rec){
        if(err){
            console.log("Duplicate record not allowed!");
        }
        next();
    });
};