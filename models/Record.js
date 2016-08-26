var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var recordSchema = mongoose.Schema({
    timeStamp: {type: Number, required: true},
    patientId: {type: String, required: true},
    type: {type: String, required: true}
});
recordSchema.index({timeStamp: 1, patientId: 1, type: 1}, {unique: true});
recordSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Record', recordSchema);
