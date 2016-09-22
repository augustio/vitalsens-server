var RecordData = require('../models/RecordData');

module.exports = function (req, res, next){
    RecordData.find({patientId: req.body.patientId},function(err, docs){
        if (!docs || !Array.isArray(docs) || docs.length === 0){
            console.log('no recordData found');
            next();
        }else{
            docs.forEach( function (doc) {
                doc.remove(function (err, rec){
                    if(err){
                        console.log("error removing recordData");
                    }
                });
            });
            next();
        }
    });
};
