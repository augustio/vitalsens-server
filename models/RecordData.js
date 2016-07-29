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
    rPeaks: mongoose.Schema({
        locS: {type: [Number]},
        locT: {type: [Number]}
    }, {_id: false}),
    pvcEvents: {type: [Number]},
    rrIntervals: {type: [Number]},
    hrvFeatures: mongoose.Schema({
        sdnn: {type: Number},
        SD1: {type: Number},
        SD2: {type: Number},
        LFHF: {type: Number},
        SPentr: {type: Number},
        SD1_SD2: {type: Number},
        stdrr: {type: Number},
        DF: {type: Number},
        rmssd: {type: Number},
        mean: {type: Number}
    }, {_id: false})
    
});
recordDataSchema.index({sequenceId: 1, timeStamp: 1, patientId: 1}, {unique: true});

module.exports = mongoose.model('RecordData', recordDataSchema);
