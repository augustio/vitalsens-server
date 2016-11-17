var jwt = require('jwt-simple');
var moment = require('moment');
var appConfig = require('../config/appConfig');

module.exports = {
    get: function (req, res, next){
        if(!req.header('Authorization')){
            return res.status(401).send({
                message: 'Please make sure your request has Authorization header'
            });
        }

        var token = req.header('Authorization').split(' ')[1];
    
        var payload = jwt.decode(token, appConfig.TOKEN_SECRET);
    
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'Token has expired'});
        }
    
        req.user = payload.sub;
    
        next();
    },
    
    post_modify: function(req, res, next){
        if(req.body.secret != appConfig.TOKEN_SECRET){
            return res.status(401).send({
                message: 'You are not authorized to perform this task!!'
            });
        }

        next();
    }
};