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
    },
    getFullRecordData: function(req, res){
        if(req.query.timeStamp != null &&
                 req.query.patientId != null &&
                 req.query.type != null){
            RecordData
                .find({type: req.query.type,
                             timeStamp: req.query.timeStamp,
                             patientId: req.query.patientId})
                .sort('start')
                .exec(function(err, result){
                if(err){
                    console.error(err);
                }
                var data = {
                    patientId: result[0].patientId,
                    timeStamp: result[0].timeStamp,
                    type: result[0].type,
                    chOne: result[0].chOne,
                    chTwo: result[0].chTwo,
                    chThree: result[0].chThree
                };
                for(var i = 1; i < result.length; i++){
                    data.chOne = data.chOne.concat(result[i].chOne);
                    data.chTwo = data.chTwo.concat(result[i].chTwo);
                    data.chThree = data.chThree.concat(result[i].chThree);
                }
                res.send(data);
            });
        }
    }
}
