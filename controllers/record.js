var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');

module.exports = {
    
    get: function (req, res){
        if(req.query.patientId != null){
            Record.find({patientId: req.query.patientId})
                .sort({timeStamp: -1}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            Record.find({}, 'timeStamp patientId type').sort({timeStamp: -1}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
        
    },

    post: function(req, res){
        var recordData = new RecordData({
            "timeStamp": req.body.timeStamp,
            "patientId": req.body.patientId,
            "start": req.body.start,
            "end": req.body.end,
            "type": req.body.type,
            "pEStart": req.body.pEStart,
            "pEEnd": req.body.pEEnd,
            "temp": req.body.temp,
            "chOne": req.body.chOne,
            "chTwo": req.body.chTwo,
            "chThree": req.body.chThree,
            "rPeaks": req.body.rPeaks,
            "pvcEvents": req.body.pvcEvents,
            "rrIntervals": req.body.rrIntervals,
            "hrvFeatures": req.body.hrvFeatures
        });
        var record = new Record({
            "timeStamp": req.body.timeStamp,
            "patientId": req.body.patientId,
            "type": req.body.type,
            "sessionId": req.body.sessionId,
            "streamUrl": req.body.streamUrl,
            "outputUrl": req.body.outputUrl
        });
        var patient = new Patient({"patientId": recordData.patientId});
        
        recordData.save(function(err, rd){
            if(err){
                res.status(409).send({message: "Duplicate record not allowed"});
            }else{
                record.save(function(err, r){
                    if(err)
                        console.log("Duplicate records not allowed");
                });
                patient.save(function(err, p){
                    if(err)
                        console.log("Duplicate patients not allowed");
                });
                console.log(rd.rPeaks.locS.sort());
                var result = {
                    "pId": rd.patientId,
                    "dType": rd.type,
                    "recordTime": getTime(rd.start),
                    "duration": Math.round((rd.end - rd.start)/1000),
                    "heartRate": calculateHeartRate(rd.rrIntervals.signal),
                    "pvcCount": rd.pvcEvents.locs.length,
                    "minRPeak": rd.rPeaks.locS.sort().shift(),
                    "maxRPeak": rd.rPeaks.locS.sort().pop()
                }
                console.log(result);
                res.status(200).send({data: result});
            }
        });
    },
    
    delete: function(req, res){
        RecordData.remove({
            patientId: req.query.patientId,
            timeStamp: req.query.timeStamp,
            type: req.query.type
        }, function(err, rdRes){
            console.log("Number of Record data removed: " + rdRes.result.n);
            Record.remove({
                patientId: req.query.patientId,
                timeStamp: req.query.timeStamp,
                type: req.query.type
            }, function(err, rRes){
                if(rRes.result.n < 1){
                    res.status(409).send({message: "Record not found"});
                }else{
                    res.status(200).send({message: "Record deleted"});
                }
            });
        });
    }
}

function getTime(tStamp){
    var d = new Date(tStamp*1000);
    var y = d.getFullYear();
    var m = formatValue(d.getMonth());
    var day = formatValue(d.getDate());
    var h = formatValue(d.getHours());
    var m = formatValue(d.getMinutes());
    var s = formatValue(d.getSeconds());
    
    return (day + "." + m + "." + y + ":" + h + ":" + m + ":" + s);
}

function calculateHeartRate(rrIntervals){
    var avRRInterval = getAverage(rrIntervals);
    return 60/avRRInterval;
}

function getAverage(value){
    var sum = value.reduce(function(a, b){
        return a + b;
    }, 0);
    
    return sum / value.length;
}

function formatValue(v){
    return v < 10 ? v : "0";
}
