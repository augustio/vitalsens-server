/******/!function(t){function e(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}// webpackBootstrap
/******/
var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";var n=r(1),a=r(2),o=r(3),i=r(4),s=r(5),l=r(6),c=r(7),u=r(8),p=r(9),d=r(10),v=r(11),f=r(12),g=r(13),h=r(14),m=r(15);angular.module("vitalsens",["ui.router","ui.bootstrap","toastr","satellizer"]).constant("API_URL","localhost:5000/").constant("malarkey",malarkey).constant("moment",moment).config(n.config).config(a.routerConfig).run(o.runBlock).service("githubContributor",f.GithubContributorService).service("webDevTec",g.WebDevTecService).controller("MainController",i.MainController).controller("AuthController",s.AuthController).controller("NavbarController",l.NavbarController).controller("PatientController",u.PatientController).controller("PatientRecordController",p.PatientRecordController).controller("RecordController",d.RecordController).controller("RecordDetailController",v.RecordDetailController).directive("acmeNavbar",h.NavbarDirective).directive("acmeMalarkey",m.MalarkeyDirective).directive("compareTo",c.CompareToDirective)},function(t,e){"use strict";function r(t,e,r,n){"ngInject";t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0,r.signupUrl=n+"auth/register",r.loginUrl=n+"auth/login"}r.$inject=["$logProvider","toastrConfig","$authProvider","API_URL"],Object.defineProperty(e,"__esModule",{value:!0}),e.config=r},function(t,e){"use strict";function r(t,e){"ngInject";t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("patient",{url:"/patient",templateUrl:"app/patient/views/patient.html",controller:"PatientController",controllerAs:"patient"}).state("patient.record",{url:"/patient-record",params:{patientId:null},templateUrl:"app/patient/views/patient.record.html",controller:"PatientRecordController",controllerAs:"pRecord"}).state("record",{url:"/record",templateUrl:"app/record/views/record.html",controller:"RecordController",controllerAs:"record"}).state("record-detail",{url:"/record-detail",params:{timeStamp:null,patientId:null,type:null},templateUrl:"app/record/views/record.detail.html",controller:"RecordDetailController",controllerAs:"rDetail"}).state("register",{url:"/register",templateUrl:"app/auth/register.html",controller:"AuthController",controllerAs:"auth"}).state("login",{url:"/login",templateUrl:"app/auth/login.html",controller:"AuthController",controllerAs:"auth"}),e.otherwise("/")}r.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=r},function(t,e){"use strict";function r(t){"ngInject";t.debug("runBlock end")}r.$inject=["$log"],Object.defineProperty(e,"__esModule",{value:!0}),e.runBlock=r},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.MainController=function n(){"ngInject";r(this,n)}},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.AuthController=function(){function t(e,n){"ngInject";r(this,t),this.$auth=e,this.$state=n}return t.$inject=["$auth","$state"],n(t,[{key:"register",value:function(){var t=this;this.$auth.signup(this.user).then(function(e){t.$auth.setToken(e.data.token),t.$state.go("home")})["catch"](function(e){t.message=e.data.message})}},{key:"login",value:function(){var t=this;this.$auth.login(this.login.user).then(function(e){t.$auth.setToken(e.data.token),t.$state.go("home")})["catch"](function(e){t.message=e.data.message})}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.NavbarController=function(){function t(e,n){"ngInject";r(this,t),this.$auth=e,this.$state=n,this.isAuthenticated=e.isAuthenticated}return t.$inject=["$auth","$state"],n(t,[{key:"logout",value:function(){this.$auth.logout(),this.$state.go("home")}}]),t}()},function(t,e){"use strict";function r(t){"ngInject";return{require:"ngModel",link:function(e,r,n,a){var o=t(n.compareTo),i=t(n.ngModel);e.$watch(n.ngModel,function(t){a.$setValidity(n.name,t===o(e))}),e.$watch(n.compareTo,function(t){a.$setValidity(n.name,t===i(e))})}}}r.$inject=["$parse"],Object.defineProperty(e,"__esModule",{value:!0}),e.CompareToDirective=r},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.PatientController=function(){function t(e,n){"ngInject";r(this,t),this.$http=e,this.API_URL=n,this.getPatients()}return t.$inject=["$http","API_URL"],n(t,[{key:"getPatients",value:function(){var t=this;this.$http.get(this.API_URL+"api/patients").then(function(e){t.patients=e.data})}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.PatientRecordController=function(){function t(e,n,a){"ngInject";r(this,t),this.$http=e,this.$state=n,this.API_URL=a,this.getPatientRecords()}return t.$inject=["$http","$state","API_URL"],n(t,[{key:"getPatientRecords",value:function(){var t=this,e=this.$state.params.patientId;this.$http.get(this.API_URL+"api/records?patientId="+e).then(function(e){t.records=e.data})}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.RecordController=function(){function t(e,n){"ngInject";r(this,t),this.$http=e,this.API_URL=n,this.getRecords()}return t.$inject=["$http","API_URL"],n(t,[{key:"getRecords",value:function(){var t=this;this.$http.get(this.API_URL+"api/records").then(function(e){t.records=e.data})}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.RecordDetailController=function(){function t(e,n,a){"ngInject";r(this,t),this.$http=e,this.$state=n,this.API_URL=a,this.getRecordDetail()}return t.$inject=["$http","$state","API_URL"],n(t,[{key:"getRecordDetail",value:function(){var t=this,e=this.$state.params.timeStamp,r=this.$state.params.patientId,n=this.$state.params.type;this.$http.get(this.API_URL+"api/record-details?timeStamp="+e+"&patientId="+r+"&type="+n).then(function(e){t.detail=e.data})}},{key:"timeConverter",value:function(t){var e=new Date(1e3*t),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=e.getFullYear(),a=r[e.getMonth()],o=e.getDate(),i=e.getHours(),s=e.getMinutes(),l=e.getSeconds(),c=o+" "+a+" "+n+" "+i+":"+s+":"+l;return c}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.GithubContributorService=function(){function t(e,n){"ngInject";r(this,t),this.$log=e,this.$http=n,this.apiHost="https://api.github.com/repos/Swiip/generator-gulp-angular"}return t.$inject=["$log","$http"],n(t,[{key:"getContributors",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?30:arguments[0];return this.$http.get(this.apiHost+"/contributors?per_page="+e).then(function(t){return t.data})["catch"](function(e){t.$log.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))})}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.WebDevTecService=function(){function t(){"ngInject";r(this,t),this.data=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{title:"ES6 (Babel formerly 6to5)",url:"https://babeljs.io/",description:"Turns ES6+ code into vanilla ES5, so you can use next generation features today.",logo:"babel.png"}]}return n(t,[{key:"getTec",value:function(){return this.data}}]),t}()},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(){"ngInject";var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:a,controllerAs:"vm",bindToController:!0};return t}Object.defineProperty(e,"__esModule",{value:!0}),e.NavbarDirective=n;var a=function o(t){"ngInject";r(this,o),this.relativeDate=t(this.creationDate).fromNow()};a.$inject=["moment"]},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){"ngInject";function e(e,r,n,a){var o=void 0,i=t(r[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});r.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){i.type(t).pause()["delete"]()}),o=e.$watch("vm.contributors",function(){angular.forEach(a.contributors,function(t){i.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){o()})}var r={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:o,controllerAs:"vm"};return r}n.$inject=["malarkey"],Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();e.MalarkeyDirective=n;var o=function(){function t(e,n){"ngInject";r(this,t),this.$log=e,this.contributors=[],this.activate(n)}return t.$inject=["$log","githubContributor"],a(t,[{key:"activate",value:function(t){var e=this;return this.getContributors(t).then(function(){e.$log.info("Activated Contributors View")})}},{key:"getContributors",value:function(t){var e=this;return t.getContributors(10).then(function(t){return e.contributors=t,e.contributors})}}]),t}()}]),angular.module("vitalsens").run(["$templateCache",function(t){t.put("app/main/main.html",'<section><div class="jumbotron text-center"><br><div class=row><p class=lead>Vitalsens Cloud Service</p></div></div></section>'),t.put("app/auth/login.html",'<div class=container><div class=row><div class="col-md-6 col-centered"><div class="panel panel-default"><div class=panel-heading>Login</div><div class=panel-body><form name=login ng-submit=auth.login()><div class=form-group><label>Email address</label><input type=email class=form-control ng-model=auth.login.user.email></div><div class=form-group><label>Password</label><input type=password class=form-control ng-model=auth.login.user.pwd></div><button type=submit class="btn btn-default">Login</button><br><br><span class=alert-danger>{{auth.message}}</span></form></div></div></div></div></div>'),t.put("app/auth/register.html",'<div class=container><div class=row><div class="col-md-6 col-centered"><div class="panel panel-default"><div class=panel-heading>Register</div><div class=panel-body><form name=register ng-submit=auth.register()><div class=form-group><label>Email address</label><input type=email class=form-control ng-model=auth.user.email></div><div class=form-group><label>Password</label><input type=password class=form-control name=pwd ng-model=auth.user.pwd></div><div class=form-group><label>Password Confirm</label><input type=password class=form-control compare-to=auth.user.pwd name=pwdConfirm ng-model=pwdConfirm> <span class=alert-danger ng-show="register.pwdConfirm.$dirty && register.pwdConfirm.$invalid">Passwords do not match</span></div><button ng-disabled=register.pwdConfirm.$invalid type=submit class="btn btn-default">Register</button></form></div></div></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav ng-controller="NavbarController as nav" class="navbar navbar-static-top navbar-inverse"><div class=container-fluid><div class="collapse navbar-collapse" id=bs-example-navbar-collapse-6><ul class="nav navbar-nav"><li class="navbar-header active"><a ng-href=#>Vitalsens</a></li><ul ng-show=nav.isAuthenticated() class="nav navbar-nav"><li><a ui-sref=record>Records</a></li><li><a ui-sref=patient>Patients</a></li></ul></ul><ul class="nav navbar-nav navbar-right"><li ng-show=nav.isAuthenticated()><a ui-sref=register>Register</a></li><li ng-hide=nav.isAuthenticated()><a ui-sref=login>Login</a></li><li ng-show=nav.isAuthenticated()><a ng-click=nav.logout()>Logout</a></li></ul></div></div></nav>'),t.put("app/patient/views/patient.html",'<div class=container><div class=row><div class=col-md-3><div class="panel panel-default"><div class="panel-heading text-center">Patients</div><ul class=list-group><li ng-repeat="p in patient.patients"><a ui-sref-active=active ui-sref="patient.record({\n                                                        patientId: p.patientId\n                                                        })" class=list-group-item><strong>patient id:</strong> {{p.patientId}}</a></li></ul></div></div><div ui-view></div></div></div>'),t.put("app/patient/views/patient.record.html",'<div class=container><div class=col-md-4><ul class=list-group><li ng-repeat="r in pRecord.records"><a class=list-group-item ui-sref-active=active ui-sref="record-detail({\n                                                timeStamp: r.timeStamp,\n                                                patientId: r.patientId,\n                                                type: r.type\n                                                })"><strong>timeStamp:</strong> {{r.timeStamp}}<br><strong>patientId:</strong> {{r.patientId}}<br><strong>type:</strong> {{r.type}}</a></li></ul></div></div>'),t.put("app/record/views/record.detail.html",'<div class=container><div class=col-md-12><div class="panel panel-default"><div class="panel-heading text-center">Record Detail</div><div class=panel-body><ul class=list-group ng-repeat="rd in rDetail.detail"><li class=list-group-item><p><strong>Patient Id:</strong> {{rd.patientId}}<br><strong>Record time:</strong> {{rDetail.timeConverter(rd.timeStamp)}}<br><strong>Record duration:</strong> {{rd.duration}} seconds<br><strong>Record Type:</strong> {{rd.type}}</p><p><strong>rPeaks</strong><br>locS: {{rd.rPeaks.locS}}<br>locT: {{rd.rPeaks.locS}}</p><p><strong>pvcEvents</strong><br>locS: {{rd.pvcEvents.locS}}<br></p><p><strong>rrIntervals</strong><br>signal: {{rd.rrIntervals.signal}}<br></p><p><strong>hrvFeatures</strong><br>sdnn: {{rd.hrvFeatures.features.sdnn}}<br>SD1: {{rd.hrvFeatures.features.SD1}}<br>SD2: {{rd.hrvFeatures.features.SD2}}<br>LFHF: {{rd.hrvFeatures.features.LFHF}}<br>SPentr: {{rd.hrvFeatures.features.SPentr}}<br>SD1/SD2: {{rd.hrvFeatures.features.SD1/SD2}}<br>stdrr: {{rd.hrvFeatures.features.stdrr}}<br>DF: {{rd.hrvFeatures.features.DF}}<br>rmssd: {{rd.hrvFeatures.features.rmssd}}<br>mean: {{rd.hrvFeatures.features.mean}}</p></li></ul></div></div></div></div>'),t.put("app/record/views/record.html",'<div class=container><div class=row><div class=col-md-3><div class="panel panel-default"><div class="panel-heading text-center">Records</div><ul class=list-group><li ng-repeat="r in record.records"><a class=list-group-item ui-sref-active=active ui-sref="record-detail({\n                                                        timeStamp: r.timeStamp,\n                                                        patientId: r.patientId,\n                                                        type: r.type\n                                                        })"><strong>timeStamp:</strong> {{r.timeStamp}}<br><strong>patientId:</strong> {{r.patientId}}<br><strong>type:</strong> {{r.type}}</a></li></ul></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-c2cf413e11.js.map