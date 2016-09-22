var Record = require('../models/RecordData');

module.exports = function (req, res, next){
    Record.find({patientId: req.body.patientId}, function(err, recs){
        if(!recs || !Array.isArray(recs) || recs.length === 0){
            console.log('no Record found');
            next();
        }else{
            recs.forEach( function (rec) {
                rec.remove(function (err, record){
                    if(err){
                        console.log("error removing Record");
                    }
                });
            });
            next();
        }
    });
};