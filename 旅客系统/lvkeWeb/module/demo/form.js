;(function($,ng,app,window){

	app.ui.ngInit({
		ngModule:'demo',
		uiInit:function(){
			$('.ui-datapicker').datetimepicker({
				format:'Y'
			});
			$('.ui.form').form({
				fields:{
					type:{
						identifier:'type',
						rules:[
							{type:'empty',prompt:'请选择'}
						]
					},
					name:{
						identifier:'name',
						rules:[
							{type:'empty',prompt:'不能为空'}
						]
					},
					email:{
						identifier:'e-mail',
						rules:[
							{type:'email',prompt:'请输入真确的email地址'}
						]
					},
					date:{
						identifier:'date',
						rules:[
							{type:'empty',prompt:'请输入日期'}
						]
					}
				},
				inline : true
			});

		}
	});

	var module=ng.module('demo',[]);

	module.controller('form',['$scope',function($scope){
		$scope.select1=['a','b','c'];
		$scope.select2=[
			{text:'a',value:'1'},
			{text:'b',value:'2'},
			{text:'c',value:'3'}
		];
	}]);

})(jQuery,angular,app,window);
