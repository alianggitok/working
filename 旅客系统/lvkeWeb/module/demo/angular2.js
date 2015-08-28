;(function($,ng,app){


	//required calling
	app.ui.ngInit({
		ngModule:'demo'
	});
		
	var module=ng.module('demo',[]);
	
	module.controller('hello', ['$scope',function hello($scope){
		$scope.getValue=function(){
			var form=$('#form-demo');
			alert(form.form('get value','date'));
		}
	}]);



})(jQuery,angular,app);
