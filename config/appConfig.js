var mongoose = require('mongoose');
var dbURL;
var message;
if(process.env.NODE_ENV == 'development'){
  message = "Connected to remote db (Server: " + process.env.NODE_ENV + ")";
  dbURL = "mongodb://83.136.249.208:27017/vitalsensdb";
}else{
  message = "Connected to local db (Server: " + process.env.NODE_ENV + ")";
  dbURL = "mongodb://localhost:27017/vitalsensdb";
}
module.exports = {
    //Database connection configuration
    connectDb: function(){
        mongoose.connect(dbURL, function(err, db){
            if(!err){
                console.log(message);
            }
        });
    },

    TOKEN_SECRET: "v1t4753n553cr3tk3y", //set this to a more elaborate value

    REALM_NAME: "ospp-engine",

    WAMP_ROUTER_URL: "ws://185.38.3.239:8000/ws",

    PIPELINE_KEYS: ["rpeaks","rrintervals","pvcevents","hrvfeatures"],

    OPEN_URL: "com.ospp.session.open",

    CLOSE_URL: "com.ospp.session.close"
}
