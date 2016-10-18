var mongoose = require('mongoose');

var dbURL = "mongodb://vitalsensAdmin:vitalsensAdmin@ds061256-a0.mlab.com:61256,ds061256-a1.mlab.com:61256/<dbname>?replicaSet=rs-ds061256";

module.exports = {
    //Database connection configuration
    connectDb: function(){
        mongoose.connect(dbURL, function(err, db){
            if(!err){
                console.log("we are connected to mongo");
            }
        });
    },
    
    TOKEN_SECRET: "this is a secret", //set this to a more elaborate value
   
    REALM_NAME: "ospp-engine",
    
    WAMP_ROUTER_URL: "ws://185.38.3.239:8000/ws",
    
    PIPELINE_KEYS: ["rpeaks","rrintervals","pvcevents","hrvfeatures"],
    
    OPEN_URL: "com.ospp.session.open",
    
    CLOSE_URL: "com.ospp.session.close",
    
    NAN: -4096
}