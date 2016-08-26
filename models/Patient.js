var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var patientSchema = mongoose.Schema({
    patientId: {type: String, required: true}
});
patientSchema.index({patientId: 1}, {unique: true});
patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Patient', patientSchema);
