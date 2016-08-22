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

            user.save(function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                res.status(200).send({token: createToken(result)});
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
    }
};

function createToken(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    //Set a more elaborate secret in a configuration file
    return jwt.encode(payload, appConfig.TOKEN_SECRET);
}
