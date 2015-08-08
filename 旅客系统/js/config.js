/**
* Global config.
* Create by Warren, from USKY.
**/

var app={};

app.info={
	name:'blacklist',
	title:'旅客安全信息系统',
	fullTitle:'SAPIS 旅客安全信息系统',
	sortTitle:'SAPIS',
	ver:'3.0',
	copyright:'Copyright &copy; 2015 USKY All rights reserved.',
	update:'2015-8-01',
	root:'',
	sourceRoot:''
};

app.path={
	root:app.info.root,//根目录
	sourceRoot:app.info.sourceRoot,//数据源根地址
	commonJS:app.info.root+'/js',//全局js
	commonCSS:app.info.root+'/css',//全局css
	module:app.info.root+'/module'//模块
};

app.settings={
	animationDuration:300,
	resourceTimeout:80000,
	menuItems:[
		{id:1,name:'',text:'首页',icon:'home',href:'module/home/home.html',target:'',children:[]},
		{id:2,name:'',text:'信息查询',icon:'table',href:'',target:'',children:[
			{id:21,name:'',text:'旅客查询',icon:'',href:'module/info/passenger.html',target:''},
			{id:22,name:'',text:'航班查询',icon:'',href:'module/info/flight.html',target:''},
			{id:23,name:'',text:'布控查询',icon:'',href:'module/info/deploy.html',target:''},
			{id:24,name:'',text:'预警查询',icon:'',href:'module/info/warning.html',target:''}
		]},
		{id:3,name:'',text:'流程管理',icon:'random',href:'',target:'',children:[
			{id:31,name:'',text:'布控管理',icon:'',href:'',target:''},
			{id:32,name:'',text:'预警后处理',icon:'',href:'',target:''}
		]},
		{id:4,name:'',text:'统计报表',icon:'area chart',href:'',target:'',children:[
			{id:41,name:'',text:'旅客统计',icon:'',href:'',target:''},
			{id:42,name:'',text:'航班统计',icon:'',href:'',target:''},
			{id:42,name:'',text:'户籍统计',icon:'',href:'',target:''},
			{id:42,name:'',text:'预警统计',icon:'',href:'',target:''}
		]},
		{id:5,name:'',text:'系统运维',icon:'settings',href:'',target:'',children:[
			{id:51,name:'',text:'系统报告',icon:'',href:'',target:''}
		]},
		{id:6,name:'',text:'页面演示',icon:'file',href:'',target:'',children:[
			{id:61,name:'',text:'搜索查询列表',icon:'',href:'module/demo/search.html',target:''},
			{id:62,name:'',text:'表单',icon:'',href:'module/demo/form.html',target:''},
			{id:63,name:'',text:'弹层、提示、确认',icon:'',href:'module/demo/modal.html',target:''}
		]}
	]
};

requirejs.config({
	baseUrl:app.path.commonJS,
	paths: {
		//plugin
		'domReady':['lib/requirejs/domReady'],
		'text':['lib/requirejs/text'],
		//lib
		'angular':['lib/angular.1.2.28.min'],
		'jquery':['lib/jquery-1.11.2.min'],
		'jquery.cookie':['lib/jquery.cookie.min'],
		'json2':['lib/json2'],
		'semanticui':['lib/semantic-ui/semantic.min'],
		//module
		'common':['common']
	},
	shim: {
		'jquery':{
			deps:['angular']
		},
		'jquery.cookie': {
			deps:['jquery']
		},
		'semanticui':{
			deps:['jquery']
		},
		'common':{
			deps:['jquery','jquery.cookie','json2','semanticui']
		}
	},
	waitSeconds:app.settings.resourceTimeout/1000
});

requirejs.onError=function(err){
	console.log('Requirejs errors: '+err.requireType);
	alert('Requirejs errors: '+err.requireType+', please refresh the page.');
	throw err;
};

require(['common']);
