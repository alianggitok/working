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
	duration:300,
	timeout:80000,
	dimmerName:{
		modals:'ui-dimmer-modals',
		dialogs:'ui-dimmer-dialogs'
	},
	menuItems:[
		{id:1,name:'',text:'首页',icon:'home',href:'module/home/home.html',target:'',children:[]},
		{id:2,name:'',text:'信息查询',icon:'table',href:'',target:'',children:[
			{id:21,name:'',text:'旅客查询',icon:'',href:'module/search/search.html',target:''},
			{id:22,name:'',text:'航班查询',icon:'',href:'#',target:''},
			{id:23,name:'',text:'布控查询',icon:'',href:'#',target:''},
			{id:24,name:'',text:'预警查询',icon:'',href:'#',target:''}
		]},
		{id:3,name:'',text:'流程管理',icon:'random',href:'#',target:'',children:[
			{id:31,name:'',text:'布控管理',icon:'',href:'module/form/form.html',target:''},
			{id:32,name:'',text:'预警后处理',icon:'',href:'#',target:''}
		]},
		{id:4,name:'',text:'统计报表',icon:'area chart',href:'#',target:'',children:[
			{id:41,name:'',text:'旅客统计',icon:'',href:'#',target:''},
			{id:42,name:'',text:'航班统计',icon:'',href:'#',target:''},
			{id:42,name:'',text:'户籍统计',icon:'',href:'#',target:''},
			{id:42,name:'',text:'预警统计',icon:'',href:'#',target:''}
		]},
		{id:5,name:'',text:'系统运维',icon:'settings',href:'#',target:'',children:[
			{id:51,name:'',text:'系统报告',icon:'',href:'#',target:''}
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
		'jquery':['lib/jquery-1.11.2.min'],
		'jquery.cookie':['lib/jquery.cookie.min'],
		'json2':['lib/json2'],
		'semanticui':['lib/semantic-ui/semantic.min'],
		//module
		'common':['common']
//		'module.blacklist':[app.path.module+'/blacklist/blacklist'],
//		'module.personlist':[app.path.module+'/personlist/personlist'],
//		'module.auditing':[app.path.module+'/auditing/auditing'],
//		'module.report':[app.path.module+'/report/report']
	},
	shim: {
		'jquery.cookie': {
			deps:['jquery']
		},
		'semanticui':{
			deps:['jquery']
		},
		'common':{
			deps:['jquery','jquery.cookie','json2','semanticui']
		}
//		'module.blacklist':{
//			deps:['common']
//		},
//		'module.personlist':{
//			deps:['common']
//		},
//		'module.auditing':{
//			deps:['common']
//		},
//		'module.report':{
//			deps:['common']
//		}
	},
	waitSeconds:app.settings.timeout/1000
});

requirejs.onError=function(err){
	console.log('Requirejs errors: '+err.requireType);
	alert('Requirejs errors: '+err.requireType+', please refresh the page.');
	throw err;
};

require(['common']);
