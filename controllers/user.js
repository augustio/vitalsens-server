var User = require('../models/User');

module.exports = {
    post: function(req, res){
        if(req.body.email && req.body.pwd && req.body.role){
            var user = new User(req.body);
            user.save(function(err, savedUser){
                if(err){
                    res.status(409).send({message: err.message});
                }else{
                    res.status(200).send({message: "user successfully saved"});
                }
            });
        }else{
            res.status(401).send({message: "Error in user format"});
        }
    },

    get: function (req, res){
        if(req.query.email == null){
            User.find({}, 'email role').exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }else{
            User.findOne({email: req.query.email}, 'email role').exec(function(err, result){
                if(err){
                    console.error(err);
                }
                res.send(result);
            });
        }
    },

    delete: function(req, res){
        User.remove({email: req.query.email}, function(err, rmInfo){
            if(err){
                res.status(409).send({message: err.message});
            }else if(rmInfo.result.n < 1){
                res.status(409).send({message: "User not found"});
            }else{
                res.status(200).send({message: "User " + req.query.email + " deleted"});
            }
        });
    }
}
