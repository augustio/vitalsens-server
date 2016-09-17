var Record = require('../models/Record');
var Patient = require('../models/Patient');
var RecordData = require('../models/RecordData');

module.exports = {
    
    get: function (req, res){
        if(req.query.patientId != null){
            Record.find({patientId: req.query.patientId}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            Record.find({}).exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
        
    },
    post: function(req, res){
        var recordData = new RecordData(req.body);
        
        recordData.save(function(err, rd){
            if(err){
                res.status(409).send({message: "Duplicate record not allowed"});
            }else{
                res.status(200).send({data: recordData});
            }
        });
    }
}
