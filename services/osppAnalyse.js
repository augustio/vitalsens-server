var autobahn = require('autobahn');
var RecordData = require('../models/RecordData');
var Record = require('../models/Record');
var appConfig = require('../config/appConfig');

module.exports = function(req, res, next){
    var dataType = req.body.type.toLowerCase();
    if(dataType.indexOf("ecg") != -1){
        console.log("Waiting for connection to OSPP live engine...");
        console.log(appConfig.WAMP_ROUTER_URL);
        var connection = new autobahn.Connection({
            url: appConfig.WAMP_ROUTER_URL,
            realm: appConfig.REALM_NAME
        });
    
        connection.open();
        connection.onopen = function (session) {
            console.log("Connected to OSPP Live Engine.");
            console.log("\n");
            var sessionId, streamUrl, outputUrl;
            var t1,t2;
            var pipelineKeys = ["rpeaks","rrintervals","pvcevents","hrvfeatures"];
            var data = [];
            var chOne = req.body.chOne;
            
            console.log("PATIENT ID: " + req.body.patientId);
            for(i = 0; i < chOne.length; i++) {
                var sample = chOne[i];
                if(sample == null)
                    sample = NaN;
                else
                    sample = parseInt(sample);
                data.push(sample);
            }
            var ecgDoc = {'ch1': data};
            Record.findOne({
                patientId: req.body.patientId,
                timeStamp: req.body.timeStamp,
                type: req.body.type
            }, function(err, existingRec){
                if(existingRec){
                    sessionId = existingRec.sessionId;
                    streamUrl = existingRec.streamUrl;
                    outputUrl = existingRec.outputUrl;
                    console.log("Session params retrieved: " + sessionId + "\n" + streamUrl + "\n" + outputUrl + "\n");
                    subscribeToResults();
                    publishData();
                }else{
                    session.call(appConfig.OPEN_URL, [pipelineKeys]).then(
                        function (res) {
                            var configUrl = res['configUrl']
                            session.subscribe(configUrl,onReceiveConfig);
                        },
                        function (err) {
                            if (err.error !== 'wamp.error.no_such_procedure') {
                                console.log('Session open request failed.');
                            }
                        }
                    );
                }
            });
            
            function onReceiveConfig(response){
                console.log("Configuration Info received from OSPP.");
                config = response[0];
                if(config['status']['resultCode'] == 1){
                
                    sessionId = config['config'].sessionId;
                    streamUrl = config['config'].streamUrl;
                    outputUrl = config['config'].outputUrl;
                    req.body.sessionId = sessionId;
                    req.body.streamUrl = streamUrl;
                    req.body.outputUrl = outputUrl;
                    console.log("ConfigInfo - Session ID : " + sessionId);
                    console.log("ConfigInfo - Stream Url : " + streamUrl);
                    console.log("ConfigInfo - Output Url : " + outputUrl);
                    console.log("\n");
                } else {
                    console.log(
                        "Pipeline configuration is failed. Reason : " + config['status']['resultMsg']
                    );
                }
                
                subscribeToResults();
                publishData();
            }
            
            function subscribeToResults(){
                session.subscribe(outputUrl,onReceiveResults);
            }
            
            function publishData(){
                console.log("Publishing input data to OSPP Engine");
                t1 = new Date().getTime() / 1000;
                session.publish(streamUrl, [ecgDoc]);
            }
            
            function onReceiveResults(res){
                t2 = new Date().getTime() / 1000;
                var totalTime = t2 - t1;
                var timeKey = 'processingTime';
                console.log("Results Received from OSPP Engine");
            
                var output = res[0];
            
                req.body.rPeaks = output.rpeaks;
                req.body.pvcEvents = output.pvcevents;
                req.body.rrIntervals = output.rrintervals;
                req.body.hrvFeatures = output.hrvfeatures;
            
                var engineTime = parseFloat(output[timeKey]);
            
                console.log("\n\t ------ Summary ------\n");
                console.log("A) OSPP Engine Procesing Time : " + engineTime.toFixed(4) + " seconds");
                console.log("B) Data Transmission Time (Both ways) : " + (totalTime - engineTime).toFixed(4) + " seconds");
                console.log("C) Request Execution Time : " + (totalTime).toFixed(4) + " seconds");

                connection.close();
            }
            connection.onclose = function(reason, details){
                console.log("Connection closed with the reason: " + reason + "\n");
                next();
            };
        
            /*function closeSession(){
                console.log("Closing the Session.");
                session.call(appConfig.CLOSE_URL, [sessionId]).then(
                    function (res) {
                        console.log(res['status']['resultMsg'] + " - Session ID : " + sessionId);
                        next();
                    },
                    function (err) {
                        if (err.error !== 'wamp.error.no_such_procedure') {
                            console.log('Session close request failed.');
                        }
                        next();
                    }
                );
            }*/
        };
    }else{
        next();
    }
}