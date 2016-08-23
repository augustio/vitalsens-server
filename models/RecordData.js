var mongoose = require('mongoose');

var recordDataSchema = mongoose.Schema({
    sequenceId: {type: Number, required: true},
    timeStamp: {type: Number, required: true},
    patientId: {type: String, required: true},
    duration: {type: Number, required: true},
    type: {type: String, required: true},
    chOne: {type: String},
    chTwo: {type: String},
    chThree: {type: String},
    rPeaks: {type: {}},
    pvcEvents: {type: {}},
    rrIntervals: {type: {}},
    hrvFeatures: {type: {}} 
});
recordDataSchema.index({sequenceId: 1, timeStamp: 1, patientId: 1, type: 1}, {unique: true});

module.exports = mongoose.model('RecordData', recordDataSchema);
