
// Simple Node.js script to connect to OSPP engine for requesting ECG signal feature analysis. 

// Author : Awais Aslam
// Email : awais.aslam@oulu.fi
// Date : 28 July 2016 

// How to run for command line
// node metropolia.js ecg.5s.txt ospp-results.txt true

// Command Line Arguments: script name, input file name, output file name, show Result

// Library Dependancies. 
// Autobahn is required to connect to WAMP Router. 
// http://autobahn.ws/js/

// fs is required to read/write files. 

// run npm install autobahn in the same directory where metropolia.js is. 

////////////////////////////////////////////////////////////////////
// Requirements

var autobahn = require('autobahn');
var fs = require('fs');

// Application Parameters Initialization

var realmName = "ospp-engine"   							// realm-name 
var wampRouterUrl = "ws://185.38.3.239:8000/ws"				// WAMP Router URL

var pipelineConfigPath = "data/config/pipeline-config.json"	// Pipeline Configuration File Path

var openUrl = "com.ospp.session.open";						// Open Session Remote procedure is registered on this URL.
var closeUrl = "com.ospp.session.close";					// Close Session Remote procedure is registered on this URL.

// Global Variables. 
var pipelineKeys;
var showResult = true;
var inFilePath = "data/in/ecg.1m.txt";
var  outFilePath = "data/out/ecg.1m.txt";
var chOne;

module.exports = {
    
    osppAnalyse: function(ch1){
        readPipelineKeys();
        chOne = ch1.slice();
    
        console.log("\n ------ Hello Metropolia ------ \n");
        console.log("Waiting for connection to OSPP live engine...");
        console.log(wampRouterUrl);
     
        var connection = new autobahn.Connection({
            url: wampRouterUrl,
            realm: realmName}
        );
        
        connection.open();
        
        connection.onopen = function (session) {

	       console.log("Connected to OSPP Live Engine.");
	       console.log("\n");

	       var sessionId, streamUrl, outputUrl;
	       var t1,t2;

	       var ecgSignal = readData()  

	       console.log("Step.1) Sending session open request to OSPP ...\n") 

	       session.call(openUrl, [pipelineKeys]).then(
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
                console.log("Step.2) Configuration Info received from OSPP.");
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
                console.log("Step.3) Publishing input data to OSPP Engine");
                t1 = new Date().getTime() / 1000;
                session.publish(streamUrl, [ecgSignal]);
            }
            function onReceiveResults(res){
                t2 = new Date().getTime() / 1000;
                var totalTime = t2 - t1	
                var timeKey = 'processingTime'			
                console.log("Step.4) Results Received Back from OSPP Engine");
                
                output = res[0];
                console.log("here");
                
                if(true){ 
                    console.log("\n\t ------ RESULTS ------\n");
                    for(key in output){
                        console.log(key);
                        if(typeof(output[key]) != "string"){
                            for(value in output[key]){
                                console.log(value);
                                console.log(JSON.stringify(output[key][value]));
                            }
                        } else{
					
                            if(key == timeKey){
                                console.log(parseFloat(output[key]).toFixed(4))
                            } else{
                                console.log(output[key]);
                            }
                        }
                        console.log("\n")
                    }
                }
                console.log("here");
                var engineTime = parseFloat(output[timeKey])
                console.log("\n\t ------ Summary ------\n");
                console.log("A) OSPP Engine Procesing Time : " + engineTime.toFixed(4) + " seconds")				
                console.log("B) Data Transmission Time (Both ways) : " + (totalTime - engineTime).toFixed(4) + " seconds")
                console.log("C) Request Execution Time : " + (totalTime).toFixed(4) + " seconds")
                
                fs.writeFile(outFilePath,JSON.stringify(output),function(err) {
                    if(err) {
                        console.log(err);
                    }
                });
                console.log("C) Results are written to the file : " + outFilePath + "\n")
                
                setTimeout(closeSession,500);
            
            }
            
            function closeSession(){
                console.log("Step.5) Closing the Session.");
                session.call(closeUrl, [sessionId]).then(
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
        console.log("Pipeline Keys : "  + pipelineKeys);
    } catch(e){
        console.log("ERROR: Incorrect Pipeline Configuration.");
    }	  
}


function readData(){
    var data = [];
    for(i = 0; i < chOne.length; i++) {
        data.push(parseInt(chOne[i]));
    }
    return {'ch1':data};
}