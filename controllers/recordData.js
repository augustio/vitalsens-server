var RecordData = require('../models/RecordData');

module.exports = {
    get: function (req, res){
        if(req.query.sequenceId == null && req.query.timeStamp == null 
           && req.query.patientId == null && req.type == null){
            RecordData.find({}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else if(req.query.timeStamp != null && 
                 req.query.patientId != null && 
                 req.query.sequenceId != null &&
                 req.query.type != null){
            RecordData.findOne({sequenceId: req.query.sequenceId,
                                timeStamp: req.query.timeStamp, 
                                patientId: req.query.patientId,
                                type: req.query.type}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else if(req.query.timeStamp != null && 
                 req.query.patientId != null && 
                 req.query.type != null){
            RecordData.find({type: req.query.type,
                             timeStamp: req.query.timeStamp,
                             patientId: req.query.patientId},
                            'type timeStamp patientId').exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
    }
}
