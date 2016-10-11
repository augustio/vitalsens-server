var RecordData = require('../models/RecordData');

module.exports = {
    get: function (req, res){
        if(req.query._id != null){
            RecordData.findOne({_id: req.query._id}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else if(req.query.timeStamp != null && 
                 req.query.patientId != null && 
                 req.query.type != null &&
                 req.query.allFields != null){
            RecordData.find({
                type: req.query.type,
                timeStamp: req.query.timeStamp,
                patientId: req.query.patientId
            }).sort('start').exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else if(req.query.timeStamp != null &&
                 req.query.patientId != null &&
                 req.query.type != null){
            RecordData
                .find({type: req.query.type,
                             timeStamp: req.query.timeStamp,
                             patientId: req.query.patientId},
                            'start end')
                .sort('start')
                .exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            RecordData.find({}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
    }
}
