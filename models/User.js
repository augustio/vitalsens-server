var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {type: String, required: true},
    pwd: {type: String, required: true}
});
userSchema.index({email: 1}, {unique: true});

module.exports = mongoose.model('User', userSchema);
