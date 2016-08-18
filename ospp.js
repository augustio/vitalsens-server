// Author : Awais Aslam
// Email : awais.aslam@oulu.fi
// Date : 28 July 2016 

// Library Dependancies. 
// Autobahn is required to connect to WAMP Router. 
// http://autobahn.ws/js/

// fs is required to read/write files. 

var autobahn = require('autobahn');
var fs = require('fs');
var RecordData = require('./models/RecordData');
var appConfig = require('./config/appConfig');

var pipelineConfigPath = "config/pipeline-config.json"
 
var pipelineKeys;
var inputData = [];

module.exports = {
    
    process: function(data){
        readPipelineKeys();
        inputData.push(data);
    
        console.log("Waiting for connection to OSPP live engine...");
        console.log(appConfig.WAMP_ROUTER_URL);
     
        var connection = new autobahn.Connection({
            url: appConfig.WAMP_ROUTER_URL,
            realm: appConfig.REALM_NAME}
        );
        
        connection.open();
        
        connection.onopen = function (session) {

	       console.log("Connected to OSPP Live Engine.");
	       console.log("\n");

	       var sessionId, streamUrl, outputUrl;
	       var t1,t2;

           var ecgDoc = inputData.shift();
           var ecgDocId = ecgDoc.id;
	       var ecgSignal = formatOSPPBoundData(ecgDoc.chOne);
           //var pipelineKeys = appConfig.PIPELINE_KEYS;

	       console.log("Sending session open request to OSPP ...\n") 

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
            function onReceiveConfig(response){
                console.log("Configuration Info received from OSPP.");
                config = response[0]
                if(config['status']['resultCode'] == 1){
                    sessionId = config['config'].sessionId;
                    streamUrl = config['config'].streamUrl;
                    outputUrl = config['config'].outputUrl;
                    console.log("ConfigInfo - Session ID : " + sessionId);
                    console.log("ConfigInfo - Stream Url : " + streamUrl);
                    console.log("ConfigInfo - Output Url : " + outputUrl);
                    console.log("\n");
                } else { 
                    console.log("Pipeline configuration is failed. Reason : " + config['status']['resultMsg']);
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
                session.publish(streamUrl, [ecgSignal]);
            }
            function onReceiveResults(res){
                t2 = new Date().getTime() / 1000;
                var totalTime = t2 - t1	
                var timeKey = 'processingTime'			
                console.log("Results Received from OSPP Engine");
                
                var output = res[0];
                RecordData.findOne({_id: ecgDocId}, function (err, doc){
                    
                    doc.rPeaks = output.rpeaks;
                    doc.pvcEvents = output.pvcevents;
                    doc.rrIntervals = output.rrintervals;
                    doc.hrvFeatures = output.hrvfeatures;
                    
                    doc.save(function(err, rd){
                        if(err){
                            console.error(err);
                        }else{
                            console.log("Record update successful");
                        }
                    });
                });
                
                var engineTime = parseFloat(output[timeKey])
                console.log("\n\t ------ Summary ------\n");
                console.log("A) OSPP Engine Procesing Time : " + engineTime.toFixed(4) + " seconds");				
                console.log("B) Data Transmission Time (Both ways) : " + (totalTime - engineTime).toFixed(4) + " seconds");
                console.log("C) Request Execution Time : " + (totalTime).toFixed(4) + " seconds");
                
                setTimeout(closeSession,500);
            
            }
            
            function closeSession(){
                console.log("Closing the Session.");
                session.call(appConfig.CLOSE_URL, [sessionId]).then(
                    function (res) {
                        console.log(res['status']['resultMsg'] + " - Session ID : " + sessionId);
                    },
                    function (err) {
                        if (err.error !== 'wamp.error.no_such_procedure') {
                            console.log('Session close request failed.');
                        }
                    }
                );
            }	
        };
    }
};

function readPipelineKeys(){
    try{
        pipelineKeys = JSON.parse(fs.readFileSync(pipelineConfigPath));
    } catch(e){
        console.log("ERROR: Incorrect Pipeline Configuration.");
    }	  
}


function formatOSPPBoundData(chOne){
    var dataArr = chOne.slice();
    var data = [];
    for(i = 0; i < chOne.length; i++) {
        data.push(parseInt(chOne[i]));
    }
    return {'ch1':data};
}