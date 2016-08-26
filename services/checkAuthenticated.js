var jwt = require('jwt-simple');
var moment = require('moment');
var appConfig = require('../config/appConfig');

module.exports = function (req, res, next){
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
};