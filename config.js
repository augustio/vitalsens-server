var mongoose = require('mongoose');

var dbURL = "mongodb://vitalsensAdmin:vitalsensAdmin@ds011482.mlab.com:11482/vitalsens";

module.exports = {
    //Database connection configuration
    connectDb: function(){
        mongoose.connect(dbURL, function(err, db){
            if(!err){
                console.log("we are connected to mongo");
            }
        });
    },
    
    REALM_NAME: "ospp-engine",
    
    WAMP_ROUTER_URL: "ws://185.38.3.239:8000/ws",
    
    PIPELINE_KEYS: ["rpeaks","rrintervals","pvcevents","hrvfeatures"],
    
    OPEN_URL: "com.ospp.session.open",
    
    CLOSE_URL: "com.ospp.session.close",
    
    SHOW_RESULT: true
}