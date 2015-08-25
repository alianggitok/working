/**
* Global config.
* Create by Warren, from USKY.
**/

var app={};

app.info={
	name:'SAPIS',
	title:'旅客安全信息系统',
	fullTitle:'SAPIS 旅客安全信息系统',
	sortTitle:'SAPIS',
	ver:'3.0',
	copyright:'Copyright &copy; 2015 USKY All rights reserved.',
	update:'2015-8-01',
	root:'/lvkeWeb',
	sourceRoot:'/lvkeWeb'
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
	menuItems:[
		{id:1,pid:0,name:'',text:'首页',icon:'home',href:'module/home/home.html',target:'',intro:''},
		
		{id:2,pid:0,name:'',text:'信息查询',icon:'table',href:'#',target:'',intro:''},
		{id:21,pid:2,name:'',text:'旅客查询',icon:'users',href:'module/info/passenger.html',target:'',intro:'查询旅客的详细信息'},
		{id:22,pid:2,name:'',text:'航班查询',icon:'plane',href:'module/info/flight.html',target:'',intro:'查询航班的详细信息'},
		{id:23,pid:2,name:'',text:'布控查询',icon:'protect',href:'module/info/control-passenger.html',target:'',intro:''},
		{id:231,pid:23,name:'',text:'布控旅客查询',icon:'',href:'module/info/control-passenger.html',target:'',intro:'查询布控的旅客的详细信息'},
		{id:232,pid:23,name:'',text:'布控航班查询',icon:'',href:'module/info/control-flight.html',target:'',intro:'查询布控的航班的详细信息'},
		{id:24,pid:2,name:'',text:'预警查询',icon:'warning sign',href:'module/info/warning.html',target:'',intro:'查询预警的详细信息'},
		
		{id:3,pid:0,name:'',text:'流程管理',icon:'random',href:'#',target:'',intro:''},
		{id:31,pid:3,name:'',text:'布控管理',icon:'protect',href:'module/flow/control/passenger-single.html',target:'',intro:''},
		{id:231,pid:31,name:'',text:'旅客单条布控',icon:'search',href:'module/flow/control/passenger-single.html',target:'',intro:''},
		{id:232,pid:31,name:'',text:'旅客批量布控',icon:'search',href:'module/flow/control/passenger-batch.html',target:'',intro:''},
		{id:233,pid:31,name:'',text:'航班布控',icon:'search',href:'module/flow/control/flight.html',target:'',intro:''},
		{id:234,pid:31,name:'',text:'布控类型',icon:'search',href:'module/flow/control/types.html',target:'',intro:''},
		{id:235,pid:31,name:'',text:'追逃布控',icon:'search',href:'module/flow/control/track.html',target:'',intro:''},
		{id:32,pid:3,name:'',text:'预警后处理',icon:'warning sign',href:'module/flow/warning/warning.html',target:'',intro:''},
		{id:321,pid:32,name:'',text:'预警反馈',icon:'warning sign',href:'module/flow/warning/warning.html',target:'',intro:''},
		
		{id:4,pid:0,name:'',text:'统计报表',icon:'area chart',href:'#',target:'',intro:''},
		{id:41,pid:4,name:'',text:'旅客统计',icon:'file text',href:'module/statistic/passenger-chart.html',target:'',intro:''},
		{id:411,pid:41,name:'',text:'旅客统计图表',icon:'file text',href:'module/statistic/passenger-chart.html',target:'',intro:''},
		{id:412,pid:41,name:'',text:'旅客统计报表',icon:'file text',href:'module/statistic/passenger-statement.html',target:'',intro:''},
		{id:42,pid:4,name:'',text:'航班统计',icon:'file text',href:'module/statistic/flight-chart.html',target:'',intro:''},
		{id:421,pid:42,name:'',text:'航班数统计图表',icon:'file text',href:'module/statistic/flight-chart.html',target:'',intro:''},
		{id:422,pid:42,name:'',text:'航班数统计报表',icon:'file text',href:'module/statistic/flight-statement.html',target:'',intro:''},
		{id:423,pid:42,name:'',text:'延误航班数统计图表',icon:'file text',href:'module/statistic/flight-delay-statement.html',target:'',intro:''},
		{id:43,pid:4,name:'',text:'户籍统计',icon:'file text',href:'module/statistic/familyregister-statement.html',target:'',intro:''},
		{id:44,pid:4,name:'',text:'预警统计',icon:'file text',href:'module/statistic/warning-chart.html',target:'',intro:''},
		
		{id:5,pid:0,name:'',text:'系统运维',icon:'settings',href:'#',target:'',intro:''},
		{id:51,pid:5,name:'',text:'系统报告',icon:'file text',href:'module/maintain/report.html',target:'',intro:''},
		
		{id:6,pid:0,name:'',text:'页面组件演示',icon:'file',href:'#',target:'',intro:''},
		{id:61,pid:6,name:'',text:'搜索查询列表',icon:'',href:'module/demo/search.html',target:'',intro:''},
		{id:62,pid:6,name:'',text:'表单',icon:'',href:'module/demo/form.html',target:'',intro:''},
		{id:63,pid:6,name:'',text:'弹层、提示、确认',icon:'',href:'module/demo/modal.html',target:'',intro:''},
		{id:64,pid:6,name:'',text:'警报',icon:'',href:'module/demo/alarm.html',target:'',intro:''},
		{id:65,pid:6,name:'',text:'Angular',icon:'',href:'module/demo/angular.html',target:'',intro:''}
	]
};

app.module={};

app.elems={};

requirejs.config({
	baseUrl:app.path.commonJS,
	paths: {
		//plugin
		'domReady':['lib/requirejs/domReady'],
		'text':['lib/requirejs/text'],
		//lib
		'angular':['lib/angular.1.2.28.min'],
		'jquery':['lib/jquery-1.11.2.min'],
		'jquery.cookie':['lib/jquery.cookie.1.4.1'],
		'jquery.datetimepicker':['lib/jquery.datetimepicker/jquery.datetimepicker'],
		'jquery.datatables':['lib/jquery.dataTables/js/jquery.dataTables.min'],
		'smarttable':['lib/smart-table/smart-table.min'],
		'json2':['lib/json2'],
		'semanticUI':['lib/semantic-ui/semantic.min'],
		//module
		'common':['common']
	},
	shim: {
		'jquery':{
			deps:['angular']
		},
		'jquery.cookie':{
			deps:['jquery']
		},
		'jquery.datetimepicker':{
			deps:['jquery']
		},
		'jquery.datatables':{
			deps:['jquery']
		},
		'smarttable':{
			deps:['angular']
		},
		'semanticUI':{
			deps:['jquery']
		},
		'common':{
			deps:['semanticUI','json2','jquery.cookie','jquery.datetimepicker','jquery.datatables','smarttable']
		}
	},
	waitSeconds:app.settings.resourceTimeout/1000
});

requirejs.onError=function(err){
	console.log('Requirejs errors: '+err.requireType, err);
	alert('Requirejs errors: '+err.requireType+', please refresh the page.');
	throw err;
};

require(['common']);
