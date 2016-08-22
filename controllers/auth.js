var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');
var appConfig = require('../config/appConfig');

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
        }, function(err, existingUser){
            if(err){
                return res.status(409).send({message: 'Email not found'});
            }
            
            bcrypt.compare(req.body.pwd, existingUser.pwd, function(err, result){
                if(err){
                    return res.status(409).send({message: 'Wrong password'});
                }
                
                res.status(200).send({token: createToken(existingUser)});
            })
        })
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
