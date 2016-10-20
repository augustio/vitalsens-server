var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    role: {type: String, required: true, default: "user"}
});
userSchema.index({email: 1}, {unique: true});
userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next){
   var user = this;
    if(!user.isModified('pwd')) return next();
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        
        bcrypt.hash(user.pwd, salt, function(err, hash){
            if(err) return next(err);
            
            user.pwd = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);
