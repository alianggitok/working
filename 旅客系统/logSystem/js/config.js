/**
* Global config.
* Create by Warren, from USKY.
**/

var app={};

app.info={
	name:'logSystem',
	title:'日志系统',
	fullTitle:'日志系统',
	sortTitle:'logSystem',
	ver:'1.0',
	copyright:'Copyright &copy; 2015 USKY All rights reserved.',
	update:'2015-8-18',
	root:'/logSystem',
	sourceRoot:'/logSystem'
};

app.path={
	root:app.info.root,//根目录
	sourceRoot:app.info.sourceRoot,//数据源根地址
	commonJS:app.info.root+'/js',//全局js
	commonCSS:app.info.root+'/css',//全局css
	sound:app.info.root+'/sound',
	module:app.info.root+'/module'//模块
};

app.settings={
	animationDuration:300,
	resourceTimeout:80000,
	bufferOpacity:0.7,
	dimmerOpacity:0.6
};

app.module={
	currentObj:null//临时存放当前模块元素的对象
};

app.elems={};

//requirejs.config({
//	baseUrl:app.path.commonJS,
//	paths: {
//		//plugin
//		'domReady':['lib/requirejs/domReady'],
//		'text':['lib/requirejs/text'],
//		//lib
//		'angular':['lib/angular.1.2.28/angular.min'],
//		'jquery':['lib/jquery-1.11.2.min'],
//		'jquery.cookie':['lib/jquery.cookie.1.4.1'],
//		'jquery.datetimepicker':['lib/jquery.datetimepicker/jquery.datetimepicker'],
//		'smarttable':['lib/smart-table/smart-table.min'],
//		'json2':['lib/json2'],
//		'semanticUI':['lib/semantic-ui/semantic.min'],
//		//module
//		'common':['common'],
//		'index':['index']
//	},
//	shim: {
//		'angular':{
//			exports:'angular'
//		},
//		'jquery':{
//			deps:['angular']
//		},
//		'jquery.cookie':{
//			deps:['jquery']
//		},
//		'jquery.datetimepicker':{
//			deps:['jquery']
//		},
//		'smarttable':{
//			deps:['angular']
//		},
//		'semanticUI':{
//			deps:['jquery']
//		},
//		'common':{
//			deps:['semanticUI','json2','jquery.cookie','jquery.datetimepicker','smarttable']
//		},
//		'index':{
//			deps:['common']
//		}
//	},
//	waitSeconds:app.settings.resourceTimeout/1000
//});
//
//requirejs.onError=function(err){
//	console.log('Requirejs errors: '+err.requireType, err);
//	alert('Requirejs errors: '+err.requireType+', please refresh the page.');
//	throw err;
//};
//
//require(['angular','index']);
