;(function($,ng,app,window,document){

	var module=ng.module('topmenu',[]);
	
	module.controller('userinfo', ['$scope',function hello($scope){
		$scope.data={
			name:'username'
		};
	}]);
	
})(jQuery,angular,app,window,document);



