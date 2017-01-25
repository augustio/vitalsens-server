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
                 req.query.type != null){
            RecordData
                .find({type: req.query.type,
                             timeStamp: req.query.timeStamp,
                             patientId: req.query.patientId},
                            'start end pEStart pEEnd')
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
                             patientId: req.query.patientId}, 
                       'patientId timeStamp type chOne chTwo chThree end')
                .sort('end')
                .exec(function(err, result){
                if(err){
                    console.error(err);
                }
                var data = {
                    patientId: result[0].patientId,
                    startTimeStamp: result[0].timeStamp,
                    endTimeStamp: result[result.length - 1].end,
                    type: result[0].type,
                    chOne: [],
                    chTwo: [],
                    chThree: []
                };
                for(var i = 0; i < result.length; i++){
                    data.chOne = data.chOne.concat(result[i].chOne);
                    data.chTwo = data.chTwo.concat(result[i].chTwo);
                    data.chThree = data.chThree.concat(result[i].chThree);
                }
                res.send(data);
            });
        }
    },
    getRecordAnalysis: function(req, res){
        if(req.query.timeStamp != null &&
                 req.query.patientId != null &&
                 req.query.type != null){
            RecordData
                .find({type: req.query.type,
                             timeStamp: req.query.timeStamp,
                             patientId: req.query.patientId},
                      'patientId timeStamp type rPeaks pvcEvents rrIntervals hrvFeatures start')
                .sort({start: 'descending'}).limit(1)
                .exec(function(err, result){
                if(err){
                    console.error(err);
                }
                var data = {
                    patientId: result[0].patientId,
                    timeStamp: result[0].timeStamp,
                    type: result[0].type,
                    rPeaks: result[0].rPeaks,
                    pvcEvents: result[0].pvcEvents,
                    rrIntervals: result[0].rrIntervals,
                    hrvFeatures: result[0].hrvFeatures
                };
                res.send(data);
            });
        }
    }
}
