/******/!function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}// webpackBootstrap
/******/
var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(1),a=n(2),i=n(3),o=n(4),s=n(5),l=n(6),c=n(7),u=n(8),d=n(9),p=n(10),v=n(11),h=n(12),f=n(13),g=n(14),m=n(15),b=n(16);angular.module("vitalsens",["ui.router","ui.bootstrap","toastr","satellizer","nvd3"]).constant("API_URL","http://52.51.162.106:5000/").constant("malarkey",malarkey).constant("moment",moment).config(r.config).config(a.routerConfig).run(i.runBlock).service("githubContributor",f.GithubContributorService).service("webDevTec",g.WebDevTecService).controller("MainController",o.MainController).controller("AuthController",s.AuthController).controller("NavbarController",l.NavbarController).controller("PatientController",u.PatientController).controller("PatientRecordController",d.PatientRecordController).controller("RecordController",p.RecordController).controller("RecordComponentsController",v.RecordComponentsController).controller("RecordComponentsDetailController",h.RecordComponentsDetailController).directive("acmeNavbar",m.NavbarDirective).directive("acmeMalarkey",b.MalarkeyDirective).directive("compareTo",c.CompareToDirective)},function(t,e){"use strict";function n(t,e,n,r){"ngInject";t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0,n.signupUrl=r+"auth/register",n.loginUrl=r+"auth/login"}n.$inject=["$logProvider","toastrConfig","$authProvider","API_URL"],Object.defineProperty(e,"__esModule",{value:!0}),e.config=n},function(t,e){"use strict";function n(t,e){"ngInject";t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("patient",{url:"/patient",templateUrl:"app/patient/views/patient.html",controller:"PatientController",controllerAs:"patient"}).state("patient.record",{url:"/patient-record",params:{patientId:null},templateUrl:"app/patient/views/patient.record.html",controller:"PatientRecordController",controllerAs:"pRecord"}).state("record",{url:"/record",templateUrl:"app/record/views/record.html",controller:"RecordController",controllerAs:"record"}).state("record-components",{url:"/record-components",params:{timeStamp:null,patientId:null,type:null},templateUrl:"app/record/views/record.components.html",controller:"RecordComponentsController",controllerAs:"rComponents"}).state("record-components.detail",{url:"/record-components.detail",params:{_id:null},templateUrl:"app/record/views/record.components.detail.html",controller:"RecordComponentsDetailController",controllerAs:"rDetail"}).state("register",{url:"/register",templateUrl:"app/auth/register.html",controller:"AuthController",controllerAs:"auth"}).state("login",{url:"/login",templateUrl:"app/auth/login.html",controller:"AuthController",controllerAs:"auth"}),e.otherwise("/")}n.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=n},function(t,e){"use strict";function n(t){"ngInject";t.debug("runBlock end")}n.$inject=["$log"],Object.defineProperty(e,"__esModule",{value:!0}),e.runBlock=n},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.MainController=function r(){"ngInject";n(this,r)}},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.AuthController=function(){function t(e,r){"ngInject";n(this,t),this.$auth=e,this.$state=r}return t.$inject=["$auth","$state"],r(t,[{key:"register",value:function(){var t=this;this.$auth.signup(this.user).then(function(e){t.$auth.setToken(e.data.token),t.$state.go("home")})["catch"](function(e){t.message=e.data.message})}},{key:"login",value:function(){var t=this;this.$auth.login(this.login.user).then(function(e){t.$auth.setToken(e.data.token),t.$state.go("home")})["catch"](function(e){t.message=e.data.message})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.NavbarController=function(){function t(e,r){"ngInject";n(this,t),this.$auth=e,this.$state=r,this.isAuthenticated=e.isAuthenticated}return t.$inject=["$auth","$state"],r(t,[{key:"logout",value:function(){this.$auth.logout(),this.$state.go("home")}}]),t}()},function(t,e){"use strict";function n(t){"ngInject";return{require:"ngModel",link:function(e,n,r,a){var i=t(r.compareTo),o=t(r.ngModel);e.$watch(r.ngModel,function(t){a.$setValidity(r.name,t===i(e))}),e.$watch(r.compareTo,function(t){a.$setValidity(r.name,t===o(e))})}}}n.$inject=["$parse"],Object.defineProperty(e,"__esModule",{value:!0}),e.CompareToDirective=n},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.PatientController=function(){function t(e,r,a){"ngInject";n(this,t),this.$http=e,this.$state=a,this.API_URL=r,this.getPatients()}return t.$inject=["$http","API_URL","$state"],r(t,[{key:"getPatients",value:function(){var t=this;this.$http.get(this.API_URL+"api/patients").then(function(e){if(t.patients=e.data,t.patients.length>0){var n={patientId:t.patients[0].patientId};t.$state.go("patient.record",n)}})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.PatientRecordController=function(){function t(e,r,a){"ngInject";n(this,t),this.$http=e,this.$state=r,this.API_URL=a,this.getPatientRecords()}return t.$inject=["$http","$state","API_URL"],r(t,[{key:"getPatientRecords",value:function(){var t=this,e=this.$state.params.patientId;this.$http.get(this.API_URL+"api/records?patientId="+e).then(function(e){t.records=e.data})}},{key:"timeConverter",value:function(t,e){var n=new Date(t),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"],i=n.getFullYear(),o=n.getMonth()+1,s=r[o-1],l=n.getDate(),c=a[n.getDay()],u=n.getHours(),d=n.getMinutes(),p=n.getSeconds(),v="";switch(e){case 1:v=c+", "+l+"."+o+"."+i+" "+u+":"+d+":"+p;break;case 2:v=l+" "+s+" "+i+" "+u+":"+d+":"+p;break;case 3:v=u+":"+d+":"+p}return v}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.RecordController=function(){function t(e,r){"ngInject";n(this,t),this.$http=e,this.API_URL=r,this.getRecords()}return t.$inject=["$http","API_URL"],r(t,[{key:"getRecords",value:function(){var t=this;this.$http.get(this.API_URL+"api/records").then(function(e){t.records=e.data})}},{key:"timeConverter",value:function(t,e){var n=new Date(t),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"],i=n.getFullYear(),o=n.getMonth()+1,s=r[o-1],l=n.getDate(),c=a[n.getDay()],u=n.getHours(),d=n.getMinutes(),p=n.getSeconds(),v="";switch(e){case 1:v=c+", "+l+"."+o+"."+i+" "+u+":"+d+":"+p;break;case 2:v=l+" "+s+" "+i+" "+u+":"+d+":"+p;break;case 3:v=u+":"+d+":"+p}return v}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.RecordComponentsController=function(){function t(e,r,a){"ngInject";n(this,t),this.$http=e,this.$state=r,this.API_URL=a,this.getRecordComponents()}return t.$inject=["$http","$state","API_URL"],r(t,[{key:"getRecordComponents",value:function(){var t=this;t.timeStamp=this.$state.params.timeStamp,t.patientId=this.$state.params.patientId,t.type=this.$state.params.type,this.$http.get(this.API_URL+"api/record-details?timeStamp="+t.timeStamp+"&patientId="+t.patientId+"&type="+t.type).then(function(e){if(t.components=e.data,t.components.length>0){var n=t.components.length-1,r={_id:t.components[n]._id};t.$state.go("record-components.detail",r)}})}},{key:"timeConverter",value:function(t,e){var n=new Date(t),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"],i=n.getFullYear(),o=n.getMonth()+1,s=r[o-1],l=n.getDate(),c=a[n.getDay()],u=n.getHours(),d=n.getMinutes(),p=n.getSeconds(),v="";switch(e){case 1:v=c+", "+l+"."+o+"."+i+" "+u+":"+d+":"+p;break;case 2:v=l+" "+s+" "+i+" "+u+":"+d+":"+p;break;case 3:v=u+":"+d+":"+p;break;case 4:v=l+"_"+s+"_"+i+"_"+u+"_"+d+"_"+p}return v}},{key:"getDuration",value:function(t,e){return Math.round(.001*(t-e))}},{key:"downloadData",value:function(){var t=this;t.timeStamp=this.timeStamp,t.patientId=this.patientId,t.type=this.type,this.$http.get(this.API_URL+"api/record-details?timeStamp="+t.timeStamp+"&patientId="+t.patientId+"&type="+t.type+"&allFields=true").then(function(e){var n=e.data,r=n.length;t.data=n[0];for(var a=1;r>a;a++)t.data.chOne=t.data.chOne.concat(n[a].chOne),t.data.chTwo=t.data.chTwo.concat(n[a].chTwo),t.data.chThree=t.data.chThree.concat(n[a].chThree);t.data.end=n[r-1].end,t.data.rPeaks=n[r-1].rPeaks,t.data.pvcEvents=n[r-1].pvcEvents,t.data.rrIntervals=n[r-1].rrIntervals,t.data.hrvFeatures=n[r-1].hrvFeatures;var i=new JSZip,o=t.patientId+"_"+t.timeConverter(t.timeStamp,4)+"_"+t.type;i.file(o+".txt",JSON.stringify(n)),i.generateAsync({type:"blob"}).then(function(t){saveAs(t,o+".zip")})})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){for(var e=0;e<o.length;e++)if(t==o[e])return!0;return!1}function a(t){var e=d3.select(".rrInt").select("svg").datum();d3.select(".nv-groups").selectAll("circle.pvc").remove();var n=d3.select(".nv-groups").selectAll("circle.pvc").data(e[0].values.filter(function(t){return r(t.x)}));n.enter().append("circle").attr("class","pvc").attr("cx",function(e){return t.xAxis.scale()(e.x)}).attr("cy",function(e){return t.yAxis.scale()(e.y)}).attr("r",5)}Object.defineProperty(e,"__esModule",{value:!0});var i,o,s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.RecordComponentsDetailController=function(){function t(e,o,s,l,c){"ngInject";n(this,t),this.$http=e,this.$state=o,this.API_URL=s,this.$interval=l,this.$scope=c,this.NAN=-4096,this.display=0,this.lastIndex=0,this.getDetail(),this.rrOptions={chart:{type:"lineChart",height:200,useInteractiveGuideline:!1,tooltip:{contentGenerator:function(t){var e=t.series[0];if(r(t.value)){var n="<tr><td class='key'>Location: </td><td class='x-value'>"+t.value+"</td></tr>",a="<thead><tr><td class='legend-color-guide'><div style='background-color: "+e.color+";'></div></td><td class='key'><strong>PVC</strong></td></tr></thead>";return"<table>"+a+"<tbody>"+n+"</tbody></table>"}e.tooltip=useVoronoi=!1}},color:["#ff0000"],x:function(t){return t.x},y:function(t){return t.y},xAxis:{axisLabel:"RR-Intervals (i = 0, 1,...n)",axisLableDistance:5},yAxis:{axisLabel:"Time (Seconds)",tickFormat:function(t){return d3.format(".02f")(t)},axisLableDistance:5},forceY:[0,1.5],callback:a,dispatch:{renderEnd:function(){a(i)}}}},this.poincareOptions={chart:{type:"scatterChart",height:350,useVoronoi:!1,duration:250,pointSize:3,pointDomain:[0,5],xAxis:{axisLabel:"RR (i)",tickFormat:function(t){return d3.format(".02f")(t)}},forceX:[-2,0,2],forceY:[-2,0,2],yAxis:{axisLabel:"RR (i+1)",tickFormat:function(t){return d3.format(".02f")(t)}},zoom:{enabled:!0,scaleExtent:[1,10],useFixedDomain:!1,useNiceScale:!1,horizontalOff:!1,verticalOff:!1,unzoomEventType:"dblclick.zoom"}}},this.ecgOptions={chart:{type:"lineWithFocusChart",height:200,useVoronoi:!1,useInteractiveGuideline:!0,color:["#0000ff"],x:function(t){return t.x},y:function(t){return t.y},xAxis:{axisLabel:"Time(ms)"},x2Axis:{showMaxMin:!1},yAxis:{axisLabel:"Voltage(mv)"},y2Axis:{},duration:500}}}return t.$inject=["$http","$state","API_URL","$interval","$scope"],s(t,[{key:"getDetail",value:function(){var t=this;t._id=this.$state.params._id,this.$http.get(this.API_URL+"api/record-details?_id="+t._id).then(function(e){if(t.detail=e.data,t.detail.rrIntervals&&t.detail.rPeaks&&t.detail.hrvFeatures){t.rr=[{key:"RR Series",values:[]}],t.poincare=[{key:"Poincare",values:[]}];for(var n,r=0,a=1;r<t.detail.rrIntervals.signal.length;r++,a++){var i=t.detail.rrIntervals.signal[r];r%2==0?n=i:t.poincare[0].values.push({x:n,y:i}),t.rr[0].values.push({x:r,y:i})}}o=t.detail.pvcEvents.locs,t.chOne=[{key:"chOne",values:[]}],t.one=t.detail.chOne,t.chTwo=[{key:"chTwo",values:[]}],t.two=t.detail.chTwo,t.chThree=[{key:"chThree",values:[]}],t.three=t.detail.chThree,t.populateData()})}},{key:"onReady",value:function(t,e){i=t.chart}},{key:"populateData",value:function(){this.lastIndex==this.one.length&&(this.lastIndex=0);var t=this.one.length-this.lastIndex,e=1e3>t?t:1e3;e+=this.lastIndex;for(var n=[],r=[],a=[],i=this.lastIndex;e>i;i++)this.one[i]==this.NAN?(n.push({x:4*i,y:parseInt(NaN)}),r.push({x:4*i,y:parseInt(NaN)}),a.push({x:4*i,y:parseInt(NaN)})):(n.push({x:4*i,y:parseInt(this.one[i])}),r.push({x:4*i,y:parseInt(this.two[i])}),a.push({x:4*i,y:parseInt(this.three[i])})),this.lastIndex++;this.chOne[0].values=n,this.chTwo[0].values=r,this.chThree[0].values=a}},{key:"setDisplay",value:function(t){this.display=t}},{key:"isECG",value:function(){var t=vm.detail.type;return t.toUpperCase().indexOf("ECG")>=0}},{key:"formatValue",value:function(t){return"number"==typeof t?t.toFixed(3):t}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.GithubContributorService=function(){function t(e,r){"ngInject";n(this,t),this.$log=e,this.$http=r,this.apiHost="https://api.github.com/repos/Swiip/generator-gulp-angular"}return t.$inject=["$log","$http"],r(t,[{key:"getContributors",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?30:arguments[0];return this.$http.get(this.apiHost+"/contributors?per_page="+e).then(function(t){return t.data})["catch"](function(e){t.$log.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.WebDevTecService=function(){function t(){"ngInject";n(this,t),this.data=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{title:"ES6 (Babel formerly 6to5)",url:"https://babeljs.io/",description:"Turns ES6+ code into vanilla ES5, so you can use next generation features today.",logo:"babel.png"}]}return r(t,[{key:"getTec",value:function(){return this.data}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(){"ngInject";var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:a,controllerAs:"vm",bindToController:!0};return t}Object.defineProperty(e,"__esModule",{value:!0}),e.NavbarDirective=r;var a=function i(t){"ngInject";n(this,i),this.relativeDate=t(this.creationDate).fromNow()};a.$inject=["moment"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){"ngInject";function e(e,n,r,a){var i=void 0,o=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){o.type(t).pause()["delete"]()}),i=e.$watch("vm.contributors",function(){angular.forEach(a.contributors,function(t){o.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){i()})}var n={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:i,controllerAs:"vm"};return n}r.$inject=["malarkey"],Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.MalarkeyDirective=r;var i=function(){function t(e,r){"ngInject";n(this,t),this.$log=e,this.contributors=[],this.activate(r)}return t.$inject=["$log","githubContributor"],a(t,[{key:"activate",value:function(t){var e=this;return this.getContributors(t).then(function(){e.$log.info("Activated Contributors View")})}},{key:"getContributors",value:function(t){var e=this;return t.getContributors(10).then(function(t){return e.contributors=t,e.contributors})}}]),t}()}]),angular.module("vitalsens").run(["$templateCache",function(t){t.put("app/main/main.html",'<section><div class="jumbotron text-center"><br><div class=row><p class=lead>Vitalsens Cloud Service</p></div></div></section>'),t.put("app/auth/login.html",'<div class=container><div class=row><div class="col-md-6 col-centered"><div class="panel panel-default"><div class=panel-heading>Login</div><div class=panel-body><form name=login ng-submit=auth.login()><div class=form-group><label>Email address</label><input type=email class=form-control ng-model=auth.login.user.email></div><div class=form-group><label>Password</label><input type=password class=form-control ng-model=auth.login.user.pwd></div><button type=submit class="btn btn-default">Login</button><br><br><span class=alert-danger>{{auth.message}}</span></form></div></div></div></div></div>'),t.put("app/auth/register.html",'<div class=container><div class=row><div class="col-md-6 col-centered"><div class="panel panel-default"><div class=panel-heading>Register</div><div class=panel-body><form name=register ng-submit=auth.register()><div class=form-group><label>Email address</label><input type=email class=form-control ng-model=auth.user.email></div><div class=form-group><label>Password</label><input type=password class=form-control name=pwd ng-model=auth.user.pwd></div><div class=form-group><label>Password Confirm</label><input type=password class=form-control compare-to=auth.user.pwd name=pwdConfirm ng-model=pwdConfirm> <span class=alert-danger ng-show="register.pwdConfirm.$dirty && register.pwdConfirm.$invalid">Passwords do not match</span></div><button ng-disabled=register.pwdConfirm.$invalid type=submit class="btn btn-default">Register</button></form></div></div></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav ng-controller="NavbarController as nav" class="navbar navbar-static-top navbar-inverse"><div class=container-fluid><div class="collapse navbar-collapse" id=bs-example-navbar-collapse-6><ul class="nav navbar-nav"><li class="navbar-header active"><a ng-href=#>Vitalsens</a></li><ul ng-show=nav.isAuthenticated() class="nav navbar-nav"><li><a ui-sref=record>Records</a></li><li><a ui-sref=patient>Patients</a></li></ul></ul><ul class="nav navbar-nav navbar-right"><!--li ng-show="nav.isAuthenticated()"><a ui-sref="register">Register</a></li--><li ng-hide=nav.isAuthenticated()><a ui-sref=login>Login</a></li><li ng-show=nav.isAuthenticated()><a ng-click=nav.logout()>Logout</a></li></ul></div></div></nav>'),t.put("app/patient/views/patient.html",'<div class=container><div class=row><div class=col-md-2><div class="panel panel-info h-scroll"><div class="panel-heading text-center">Patients</div><ul class=list-group><li ng-repeat="p in patient.patients"><a ui-sref-active=active ui-sref="patient.record({\n                                                        patientId: p.patientId\n                                                        })" class=list-group-item>{{p.patientId}}</a></li></ul></div></div><div ui-view></div></div></div>'),t.put("app/patient/views/patient.record.html",'<div class=container><div class=row><div class=col-md-10><div class="panel panel-info h-scroll"><div class="panel-heading text-center">Records</div><ul><li class=list-item-horizontal ng-repeat="r in pRecord.records"><a class=list-group-item ui-sref-active=active ui-sref="record-components({timeStamp:        r.timeStamp, patientId: r.patientId, type: r.type})"><button type=button class="btn btn-info btn-md">{{pRecord.timeConverter(r.timeStamp, 2)}}<br>{{r.type}}</button></a></li></ul></div></div></div></div>'),t.put("app/record/views/record.components.detail.html",'<div class=container><div class=col-md-10><div class=row ng-if="rDetail.display == 0"><button ng-show=rDetail.isECG() type=button class="pull-left btn btn-info" ng-click=rDetail.setDisplay(1)>Show Analysis</button></div><div class=row ng-if="rDetail.display == 0"><div class="panel panel-default"><div class="panel-heading text-center"><span class=text-center><strong>{{rDetail.detail.type}}</strong></span></div><div class="panel-body xy-scroll"><button type=button class="pull-right btn btn-info" ng-click=rDetail.populateData()>Next</button><div class=row><nvd3 options=rDetail.ecgOptions data=rDetail.chOne></nvd3><nvd3 options=rDetail.ecgOptions data=rDetail.chTwo></nvd3><nvd3 options=rDetail.ecgOptions data=rDetail.chThree></nvd3></div></div></div></div><div class=row ng-if="rDetail.display == 1"><button type=button class="pull-left btn btn-info" ng-click=rDetail.setDisplay(0)>Show Raw</button></div><div class=row ng-if="rDetail.display == 1"><div class="panel panel-default"><div class="panel-heading text-center"><span class=text-center><strong>PVC EVENT</strong></span></div><div class=panel-body></div></div><div class="panel panel-default"><div class="panel-heading text-center"><span class=text-center><strong>TACHOGRAM SIGNAL (RR INTERVAL SERIES)</strong></span></div><div class=panel-body><nvd3 options=rDetail.rrOptions data=rDetail.rr on-ready=rDetail.onReady class="with-3d-shadow with-transitions rrInt"></nvd3></div></div><div class="panel panel-default"><div class=panel-body><div class=col-md-6><div class="panel panel-default"><div class="panel-heading text-center"><span class=text-center><strong>POINCARE PLOT</strong></span></div><div class=panel-body><nvd3 options=rDetail.poincareOptions data=rDetail.poincare class="with-3d-shadow with-transitions poincarePlot"></nvd3></div></div></div><div class=col-md-6><table class=table><thead><tr class=info><th>Feature</th><th>Value</th></tr></thead><tbody><tr class=success><td>Mean</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.mean)}}</td></tr><tr class=info><td>Standard Deviation</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.sdnn)}}</td></tr><tr class=success><td>Ratio of Powers (LF/HF)</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.LFHF)}}</td></tr><tr class=info><td>Spectral Entropy</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.SPentr)}}</td></tr><tr class=success><td>Dominant Frequency</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.DF)}}</td></tr><tr class=info><td>Standard Deviation (Nearest RR Intervals)</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.stdrr)}}</td></tr><tr class=success><td>Root Mean Square(Standard Deviation)</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.rmssd)}}</td></tr><tr class=info><td>SD1</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.SD1)}}</td></tr><tr class=success><td>SD2</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.SD2)}}</td></tr><tr class=info><td>SD1/SD2</td><td>{{rDetail.formatValue(rDetail.detail.hrvFeatures.features.SD1_SD2)}}</td></tr></tbody></table></div></div></div></div></div></div>'),t.put("app/record/views/record.components.html",'<div class=container><div class=row><div class=col-md-12><div class="panel panel-info"><div class=panel-heading><div class=row><div class="col-md-3 text-center">{{rComponents.patientId}}</div><div class="col-md-3 text-center">{{rComponents.timeConverter(rComponents.timeStamp, 1)}}</div><div class="col-md-3 text-center">{{rComponents.type}}</div><div class=col-md-3><button type=button class="pull-right btn btn-info" ng-click=rComponents.downloadData()>Download</button></div></div></div><div class=panel-body><div class=row><div class="col-md-2 text-center h-scroll"><ul class=list-group><li ng-repeat="rc in rComponents.components"><a class=list-group-item ui-sref-active=active ui-sref="record-components.detail({_id: rc._id})">{{rComponents.timeConverter(rc.start, 3)}}<br>{{rComponents.getDuration(rc.end, rc.start)}} sec</a></li></ul></div><div ui-view></div></div></div></div></div></div></div>'),t.put("app/record/views/record.html",'<div class=container><div class=row><div class=col-md-12><div class="panel panel-info h-scroll"><div class="panel-heading text-center">Records</div><ul><li class=list-item-horizontal ng-repeat="r in record.records"><a class=list-group-item ui-sref-active=active ui-sref="record-components({\n                                                        timeStamp: r.timeStamp,\n                                                        patientId: r.patientId,\n                                                        type: r.type\n                                                        })"><button type=button class="btn btn-info btn-md">{{record.timeConverter(r.timeStamp, 2)}}<br>{{r.patientId}}<br>{{r.type}}</button></a></li></ul></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-eb2b5f63eb.js.map
