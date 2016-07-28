var RecordData = require('../models/recordData');

module.exports = {
    get: function (req, res){
        RecordData.find({}).exec(function(err, result){
            if(err){
                console.error(err);
            }
            res.send(result);
        });
    }
}
