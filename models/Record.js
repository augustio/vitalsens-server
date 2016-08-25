var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({
    timeStamp: {type: Number, required: true},
    patientId: {type: String, required: true},
    type: {type: String, required: true}
});
recordSchema.index({timeStamp: 1, patientId: 1, type: 1}, {unique: true});

module.exports = mongoose.model('Record', recordSchema);
