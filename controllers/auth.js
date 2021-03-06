var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');
var appConfig = require('../config/appConfig');
var bcrypt = require('bcrypt');

module.exports = {
    register: function (req, res){

        User.findOne({
            email: req.body.email
        }, function (err, existingUser) {
            if(existingUser)
                return res.status(409).send({message: 'Email is already registered'});

            var user = new User(req.body);

            user.save(function (err) {
                if (err) {
                    return res.status(500).send({
                        message: err.message
                    });
                }
                res.status(200).send({message: "User successfully registered"});
            });
        });
    },
    login: function (req, res){

        User.findOne({
            email: req.body.email
        }, function(err, user){
            if(!user){
                return res.status(409).send({
                    message: 'Email invalid'
                });
            }

            bcrypt.compare(req.body.pwd, user.pwd, function(err, result){
                if(result){
                    res.status(200).send({
                        token: createToken(user)
                    });
                }else{
                    return res.status(409).send({
                        message: 'Password invalid'
                    });
                }
            });
        });
    },
};

function createToken(user){
    var payload = {
        user:{
            _id: user._id,
            email: user.email,
            role: user.role
        },
        iat: moment().unix(),
        exp: moment().add(48, 'hours').unix()
    };

    //Set a more elaborate secret in a configuration file
    return jwt.encode(payload, appConfig.TOKEN_SECRET);
}
