mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
    patientId: {type: String, required: true}
});
patientSchema.index({patientId: 1}, {unique: true});

module.exports = mongoose.model('Patient', patientSchema);
