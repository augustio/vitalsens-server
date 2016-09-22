var RecordData = require('../models/RecordData');

module.exports = function (req, res, next){
    RecordData.find({
        patientId: req.body.patientId,
        timeStamp: req.body.timeStamp,
        type: req.body.type
    },function(err, docs){
        if (!docs || !Array.isArray(docs) || docs.length === 0){
            console.log('no docs found');
            next();
        }else{
            docs.forEach( function (doc) {
                doc.remove(function (err, rec){
                    if(err){
                        console.log("error removing RecordData");
                    }
                });
            });
            next();
        }
    });
};