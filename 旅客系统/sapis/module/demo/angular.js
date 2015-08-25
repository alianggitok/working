;(function($,ng){
	ng.element(document).ready(function () {

//		alert()
		
		var module=ng.module('demo',[]);
		
		console.log(module);
		
		module.controller('hello',[
			'$scope',
			function hello($scope){
				alert()
				$scope.words={
					text:'Hello angular'
				};
			}
		]);

		
	});
})(jQuery,angular);

//require(['angular'],function(){
//	var module=angular.module('demo', []);
//
//	module.controller('hello',[
//		'$scope',
//		function hello($scope){
//			$scope.words={
//				text:'Hello angular'
//			};
//		}
//	]);
//});