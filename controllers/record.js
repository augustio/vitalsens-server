var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');

module.exports = {
    get: function (req, res){
        var params = req.query;
        var conditions = {};
        if(params.patientId != null){
            conditions.patientId = params.patientId;
        }
        if(params.timeStamp != null){
            conditions.timeStamp = params.timeStamp;
        }
        if(params.type != null){
            conditions.type = params.type;
        }
        Record.find(conditions, 'timeStamp patientId type')
              .sort({timeStamp: -1})
              .exec(function(err, result){
                  if(err){
                      console.error(err);
                  }
                  res.send(result);
              });
    },

    post: function(req, res){
        var recordData = new RecordData(req.body);
        if(recordData.type.substring(0,3).toUpperCase() == 'ECG'){
            var analysis = req.body.analysisData || {};
            recordData.rPeaks = analysis.rpeaks;
            recordData.pvcEvents = analysis.pvcevents;
            recordData.rrIntervals = analysis.rrintervals;
            recordData.hrvFeatures = analysis.hrvFeatures;
        }
        var record = new Record(req.body);
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

                var result = rd.type.toLowerCase().includes("ecg") ?  {
                    "pId": rd.patientId,
                    "dType": rd.type,
                    "recordTime": getTime(rd.start),
                    "duration": Math.round((rd.end - rd.start)/1000),
                    "heartRate": (rd.rrIntervals ? calculateHeartRate(rd.rrIntervals.signal) : 0),
                    "pvcCount": (rd.pvcEvents ? rd.pvcEvents.locs.length : 0),
                    "minRPeak": (rd.rPeaks ? arrayMin(rd.rPeaks.locS) : 0),
                    "maxRPeak": (rd.rPeaks ? arrayMax(rd.rPeaks.locS) : 0)
                } : {};
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
    var d = new Date(tStamp);
    var y = d.getFullYear();
    var M = formatValue(d.getMonth() + 1);
    var day = formatValue(d.getDate());
    var h = formatValue(d.getHours());
    var m = formatValue(d.getMinutes());
    var s = formatValue(d.getSeconds());

    return (day + "." + M + "." + y + "  " + h + ":" + m + ":" + s);
}

function calculateHeartRate(rrIntervals){
    var avRRInterval = getAverage(rrIntervals);
    return Math.round(60/avRRInterval);
}

function getAverage(value){
    var sum = value.reduce(function(a, b){
        return a + b;
    }, 0);

    return sum / value.length;
}

function formatValue(v){
    return v < 10 ? "0" + v : v;
}

function arrayMin(arr) {
    if(arr.length < 1)
        return 0;
    return arr.reduce(function (p, v) {
        return ( p < v ? p : v );
    });
}

function arrayMax(arr) {
    if(arr.length < 1)
        return 0;
    return arr.reduce(function (p, v) {
        return ( p > v ? p : v );
    });
}
