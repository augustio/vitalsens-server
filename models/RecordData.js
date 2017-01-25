var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var recordDataSchema = mongoose.Schema({
    timeStamp: {type: Number, required: true},
    patientId: {type: String, required: true},
    start:{type: Number, required: true},
    end: {type: Number, required: true},
    type: {type: String, required: true},
    pEStart: {type: Number, required: true, default: -1},
    pEEnd: {type: Number, required: true, default: -1},
    temp: {type: Number, required: true, default: 0.0},
    chOne: {type: [Number]},
    chTwo: {type: [Number]},
    chThree: {type: [Number]},
    rPeaks: {type: {}},
    pvcEvents: {type: {}},
    rrIntervals: {type: {}},
    hrvFeatures: {type: {}} 
});
recordDataSchema.index({start: 1, timeStamp: 1, patientId: 1, type: 1}, {unique: true});
recordDataSchema.index({timeStamp: 1, patientId: 1, type: 1});
recordDataSchema.index({patientId: 1});
recordDataSchema.plugin(uniqueValidator);

module.exports = mongoose.model('RecordData', recordDataSchema);
